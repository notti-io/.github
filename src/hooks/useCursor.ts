/* eslint-disable react-hooks/exhaustive-deps */
import { RefObject, useEffect, useLayoutEffect } from 'react'
import { useHover } from 'usehooks-ts'
import useStore from '@/api/store'
import { Icon } from '@/assets'

export function useCursor<T extends HTMLElement = HTMLElement>(id: string, elementRef: RefObject<T>, icon?: Icon) {
  const setIsHovering = useStore(state => state.setIsHovering)
  const hovered = useHover(elementRef)

  useLayoutEffect(() => {
    setIsHovering(id, hovered, icon)
  }, [setIsHovering, id, icon, hovered])

  useEffect(() => {
    return () => {
      setIsHovering(id, false)
    }
  }, [])

  return hovered
}
