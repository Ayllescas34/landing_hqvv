// Client-safe stub replacing @payloadcms/plugin-cloud-storage/utilities barrel.
// The real barrel re-exports resolveSignedURLKey which imports payload internals
// → undici → node:assert/async_hooks/buffer — none of which work in the browser.
// getFileKey and sanitizePrefix are pure string functions; we inline them here.

function sanitizePrefix(prefix) {
  if (!prefix) return ''
  let decoded
  try { decoded = decodeURIComponent(prefix) } catch { return '' }
  if (/%[0-9a-f]{2}/i.test(decoded)) return ''
  return decoded
    .replace(/\\/g, '/')
    .split('/')
    .filter((s) => s !== '..' && s !== '.')
    .join('/')
    .replace(/^\/+/, '')
    // eslint-disable-next-line no-control-regex
    .replace(/[\x00-\x1f\x80-\x9f]/g, '')
}

export { sanitizePrefix }

export function getFileKey({ collectionPrefix, docPrefix, filename, useCompositePrefixes = false }) {
  const safeCollectionPrefix = sanitizePrefix(collectionPrefix || '')
  const safeDocPrefix = sanitizePrefix(docPrefix || '')
  const safeFilename = filename
  const parts = useCompositePrefixes
    ? [safeCollectionPrefix, safeDocPrefix, safeFilename].filter(Boolean)
    : [(safeDocPrefix || safeCollectionPrefix), safeFilename].filter(Boolean)
  return {
    fileKey: parts.join('/'),
    sanitizedCollectionPrefix: safeCollectionPrefix,
    sanitizedDocPrefix: safeDocPrefix,
    sanitizedFilename: safeFilename,
  }
}

// Server-only exports — stubs so the client bundle doesn't break
export function getFilePrefix() { return '' }
export function initClientUploads() {}
export function resolveSignedURLKey() { return null }
