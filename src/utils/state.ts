export function getIsDebug() {
  if (!window) return false
  if (import.meta.env.DEV) return true
  return window.location.hash === '#debug'
}
