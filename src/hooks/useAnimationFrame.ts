import { useCallback, useEffect, useRef } from 'react'

export function useAnimationFrame(cb: (timestamp: number) => void, shouldAnimate = true) {
  const frame = useRef<number | null>(null)
  const callback = useRef(cb)

  const animate = useCallback((timestamp: number) => {
    callback.current(timestamp)
    frame.current = requestAnimationFrame(animate)
  }, [])
  const clear = useCallback(() => {
    if (frame.current !== null) {
      cancelAnimationFrame(frame.current)
      frame.current = null
    }
  }, [])

  useEffect(() => {
    callback.current = cb
  }, [cb])

  useEffect(() => {
    if (shouldAnimate) {
      frame.current = requestAnimationFrame(animate)
    } else {
      clear()
    }
    return clear
  }, [shouldAnimate, animate, clear])
}
