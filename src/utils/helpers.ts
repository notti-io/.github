export function noop() {}

export function disableReactDevToolsIf(condition: boolean) {
  if (!condition) return
  if (!window || !window.document) return
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const globalHook = (window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__
  if (typeof globalHook !== 'function') return
  if (typeof globalHook !== 'object' || !globalHook) return
  for (const prop in globalHook) {
    if (prop === 'renderers') {
      globalHook[prop] = new Map()
      continue
    }
    globalHook[prop] = typeof globalHook[prop] === 'function' ? noop : null
  }
}

export function alwaysRedirectTo(to: string) {
  if (!window) return
  if (!window.location) return
  if (!window.location.pathname) return
  if (typeof window.location.replace !== 'function') return
  if (window.location.pathname === to) return
  window.location.replace(to)
}
