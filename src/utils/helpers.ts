export function noop() {}

export function mediaQuery(query: string) {
  if (!window) return false
  return window.matchMedia(query).matches
}

export function classNames(args: (string | undefined | null | boolean)[]) {
  return args.filter(Boolean).join(' ')
}
