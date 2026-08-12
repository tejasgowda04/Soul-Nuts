/**
 * Cloudinary image upload service with client-side validation & fallback
 */

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || ''
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || ''

export const isCloudinaryConfigured = Boolean(
  CLOUD_NAME &&
    CLOUD_NAME !== 'soulnuts' &&
    UPLOAD_PRESET &&
    UPLOAD_PRESET !== 'soulnuts_products'
)

/**
 * Validate image file
 */
export function validateImageFile(file) {
  if (!file) return { valid: false, error: 'No file selected.' }

  if (!file.type.startsWith('image/')) {
    return { valid: false, error: 'Please upload a valid image file (PNG, JPG, WEBP).' }
  }

  const maxSizeInBytes = 5 * 1024 * 1024 // 5MB
  if (file.size > maxSizeInBytes) {
    return { valid: false, error: 'Image file size must be less than 5MB.' }
  }

  return { valid: true }
}

/**
 * Upload image to Cloudinary (or convert to DataURL as fallback)
 */
export async function uploadProductImage(file, onProgress) {
  const validation = validateImageFile(file)
  if (!validation.valid) {
    throw new Error(validation.error)
  }

  // If Cloudinary is configured with real credentials, perform HTTPS upload
  if (isCloudinaryConfigured) {
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', UPLOAD_PRESET)

      const xhr = new XMLHttpRequest()
      const uploadUrl = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

      return await new Promise((resolve, reject) => {
        xhr.open('POST', uploadUrl)

        if (onProgress && xhr.upload) {
          xhr.upload.onprogress = (e) => {
            if (e.lengthComputable) {
              const percent = Math.round((e.loaded / e.total) * 100)
              onProgress(percent)
            }
          }
        }

        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            const data = JSON.parse(xhr.responseText)
            resolve(data.secure_url || data.url)
          } else {
            const err = JSON.parse(xhr.responseText || '{}')
            reject(new Error(err.error?.message || 'Cloudinary upload failed.'))
          }
        }

        xhr.onerror = () => reject(new Error('Network error during image upload.'))
        xhr.send(formData)
      })
    } catch (err) {
      console.warn('Cloudinary upload error, falling back to local image data:', err)
    }
  }

  // Fallback: Read as base64 DataURL for offline / demo mode
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(new Error('Failed to read image file.'))
    reader.readAsDataURL(file)
  })
}
