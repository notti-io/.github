import type { Object3D } from 'three'
import { create } from 'zustand'
import { mediaQuery } from '@/utils/helpers'
import { getAccentColor, getIsDebug } from '@/utils/state'
import Pointer from './Pointer'

export interface Store {
  accentColor: string
  setAccentColor: (accentColor: string) => void

  isDebug: boolean
  setIsDebug: (isDebug: boolean) => void

  isPointerTouch: boolean
  setIsPointerTouch: (isPointerTouch: boolean) => void

  isPointerOut: boolean
  setIsPointerOut: (isPointerOut: boolean) => void

  isPointerDown: boolean
  setIsPointerDown: (isPointerDown: boolean) => void

  isHovering: boolean
  setIsHovering: (isHovering: boolean) => void

  pointer: Pointer
  setPointerCoords: (x: number, y: number) => void

  world: Object3D | null
  setWorld: (world: Object3D | null) => void
}

export const initialAccentColor = getAccentColor()
export const initialIsDebug = getIsDebug()
export const initialIsPointerTouch = mediaQuery('(pointer: coarse)')

const useStore = create<Store>(set => ({
  accentColor: initialAccentColor,
  setAccentColor: accentColor => set({ accentColor }),

  isDebug: initialIsDebug,
  setIsDebug: isDebug => set({ isDebug }),

  isPointerTouch: initialIsPointerTouch,
  setIsPointerTouch: isPointerTouch => set({ isPointerTouch }),

  isPointerOut: true,
  setIsPointerOut: isPointerOut => set({ isPointerOut }),

  isPointerDown: false,
  setIsPointerDown: isPointerDown => set({ isPointerDown }),

  isHovering: false,
  setIsHovering: isHovering => set({ isHovering }),

  pointer: new Pointer(),
  setPointerCoords: (x, y) =>
    set(state => {
      state.pointer.set(x, y)
      return state
    }),

  world: null,
  setWorld: world => set({ world }),
}))

export default useStore
