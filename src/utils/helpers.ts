export function noop() {}

export function mediaQuery(query: string) {
  if (!window) return false
  return window.matchMedia(query).matches
}
