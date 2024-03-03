import { getIsDebug } from '@/utils/state'
import { create } from 'zustand'
import Pointer from './Pointer'

export interface Store {
  isDebug: boolean
  setIsDebug: (isDebug: boolean) => void

  isPointerOut: boolean
  setIsPointerOut: (isPointerOut: boolean) => void

  isPointerDown: boolean
  setIsPointerDown: (isPointerDown: boolean) => void

  isHovering: boolean
  setIsHovering: (isHovering: boolean) => void

  pointer: Pointer
  setPointerCoords: (x: number, y: number) => void
}

export const initialIsDebug = getIsDebug()

const useStore = create<Store>(set => ({
  isDebug: initialIsDebug,
  setIsDebug: isDebug => set({ isDebug }),

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
}))

export default useStore
