export function getIsDebug() {
  return import.meta.env.DEV || window.location.hash === '#debug'
}
