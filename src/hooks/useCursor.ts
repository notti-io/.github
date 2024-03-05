/* eslint-disable react-hooks/exhaustive-deps */
import { RefObject, useEffect, useLayoutEffect } from 'react'
import { useHover } from 'usehooks-ts'
import useStore from '@/api/store'

export function useCursor<T extends HTMLElement = HTMLElement>(id: string, elementRef: RefObject<T>) {
  const setIsHovering = useStore(state => state.setIsHovering)
  const hovered = useHover(elementRef)

  useLayoutEffect(() => {
    setIsHovering(id, hovered)
  }, [setIsHovering, id, hovered])

  useEffect(() => {
    return () => {
      setIsHovering(id, hovered)
    }
  }, [])

  return hovered
}
