export function noop() {}

export function mediaQuery(query: string) {
  if (!window) return false
  return window.matchMedia(query).matches
}

export function classNames(args: (string | undefined | null | boolean)[]) {
  return args.filter(Boolean).join(' ')
}

export function isValidHex(hex: string) {
  return /^#(([0-9A-F]{2}){3,4}|[0-9A-F]{3})$/i.test(hex)
}
