import { useCallback, useEffect } from 'react'
import { useEventListener, useMediaQuery } from 'usehooks-ts'
import useStore from '@/api/store'
import useBoolStore from './useBoolStore'

function usePointer() {
  const isPointerTouch = useMediaQuery('(pointer: coarse)')
  const setIsPointerTouch = useStore(state => state.setIsPointerTouch)
  const setIsPointerOut = useStore(state => state.setIsPointerOut)
  const setIsPointerDown = useStore(state => state.setIsPointerDown)
  const setPointerCoords = useStore(state => state.setPointerCoords)
  const [onPointerOut, onPointerIn] = useBoolStore(setIsPointerOut)
  const [onPointerDown, onPointerUp] = useBoolStore(setIsPointerDown)

  useEffect(() => setIsPointerTouch(isPointerTouch), [setIsPointerTouch, isPointerTouch])

  const onPointerMove = useCallback(
    (e?: MouseEvent | Touch | undefined | null) => {
      if (!e) return
      setPointerCoords(e.clientX, e.clientY)
      onPointerIn()
    },
    [setPointerCoords, onPointerIn],
  )
  const onMouseMove = useCallback((e: MouseEvent) => onPointerMove(e), [onPointerMove])
  const onTouchMove = useCallback((e: TouchEvent) => onPointerMove(e.touches[0]), [onPointerMove])

  useEventListener('mouseout', onPointerOut)
  useEventListener('blur', onPointerOut)
  useEventListener('mousedown', onPointerDown)
  useEventListener('mouseup', onPointerUp)
  useEventListener('mousemove', onMouseMove)
  useEventListener('touchstart', onTouchMove)
  useEventListener('touchmove', onTouchMove)
}

export default usePointer
