// Colour palette for CSS pouch art (matches demo PALETTE object)
export const PALETTE = {
  almond:    ['#c99a63', '#e6c896'],
  cashew:    ['#e9dfc2', '#f5efdd'],
  pistachio: ['#7e8f60', '#a9bb85'],
  walnut:    ['#6e4a2e', '#96684a'],
  date:      ['#4a2e1c', '#6e4530'],
  fig:       ['#8b4a49', '#b06e6c'],
  raisin:    ['#3c2a1e', '#5c4232'],
  seed:      ['#8a7a4d', '#b6a76e'],
  ladoo:     ['#7a4a24', '#a6541e'],
}

/**
 * Builds a WhatsApp deep-link pre-filled with the order summary.
 * @param {Array} cartItems  – array of { name, price, qty, weightLabel }
 * @returns {string} Full wa.me URL
 */
export function buildWhatsAppUrl(cartItems) {
  if (!cartItems || cartItems.length === 0) return 'https://wa.me/918310440354'

  const lines = cartItems.map(
    (item) => `${item.name}${item.weightLabel ? ` (${item.weightLabel})` : ''} ×${item.qty}`
  )

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0)

  const text = [
    "Hi Soulnuts, I'd like to order:",
    '',
    ...lines,
    '',
    `Subtotal: ₹${subtotal}`,
    '',
    'Please confirm availability and payment details. Thank you!',
  ].join('\n')

  return `https://wa.me/918310440354?text=${encodeURIComponent(text)}`
}

/**
 * Generates scattered grain dot HTML strings for the pouch card visual.
 * @param {string} colorKey – key into PALETTE
 * @returns {Array} array of style objects for rendering grain dots
 */
export function generateGrainDots(colorKey) {
  const colors = PALETTE[colorKey] || ['#c99a63', '#e6c896']
  const dots = []
  // Use a seeded approach based on colorKey so dots are consistent per product
  const seed = colorKey.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
  const rand = (n, offset = 0) => ((seed * (n + 1) * 1234567) % 1000) / 1000 + offset

  for (let i = 0; i < 12; i++) {
    const size = 10 + (rand(i * 3) * 16)
    const left = 8 + (rand(i * 5) * 84)
    const top = 46 + (rand(i * 7) * 46)
    const rotate = rand(i * 11) * 360
    const borderRadius = `${40 + rand(i * 13) * 30}% ${60 - rand(i * 17) * 30}% 50% 50%`
    dots.push({
      width: size,
      height: size * 0.8,
      left: `${left}%`,
      top: `${top}%`,
      background: colors[i % 2],
      transform: `rotate(${rotate}deg)`,
      borderRadius,
    })
  }
  return dots
}

/**
 * Returns the gradient background string for a product's pouch visual.
 * @param {string} colorKey
 * @returns {string} CSS gradient string
 */
export function getPouchGradient(colorKey) {
  const colors = PALETTE[colorKey] || ['#c99a63', '#e6c896']
  return `linear-gradient(160deg, ${colors[1]}, ${colors[0]})`
}
