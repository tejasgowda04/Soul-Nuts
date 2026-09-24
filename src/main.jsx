import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)

function showStartupError(error) {
  const message = error?.stack || error?.message || String(error)

  rootElement.replaceChildren()

  const wrapper = document.createElement('div')
  wrapper.style.cssText =
    'min-height:100vh;padding:32px;box-sizing:border-box;background:#f7f3e8;color:#163b2b;font-family:Arial,sans-serif;'

  const title = document.createElement('h1')
  title.textContent = 'Soulnuts App Error'
  title.style.cssText = 'margin:0 0 16px;font-size:28px;'

  const note = document.createElement('p')
  note.textContent =
    'The deployment is loading, but the React app hit this error:'
  note.style.cssText = 'margin:0 0 16px;font-size:16px;'

  const pre = document.createElement('pre')
  pre.textContent = message
  pre.style.cssText =
    'white-space:pre-wrap;overflow:auto;padding:16px;border-radius:10px;background:#fff;border:1px solid #ddd;color:#222;font-size:14px;line-height:1.5;'

  wrapper.append(title, note, pre)
  rootElement.appendChild(wrapper)

  console.error('Soulnuts startup error:', error)
}

window.addEventListener('error', (event) => {
  showStartupError(event.error || event.message)
})

window.addEventListener('unhandledrejection', (event) => {
  showStartupError(event.reason)
})

import('./App.jsx')
  .then(({ default: App }) => {
    root.render(
      <StrictMode>
        <App />
      </StrictMode>,
    )
  })
  .catch(showStartupError)
