import type { Mesh, Object3D } from 'three'
import { create } from 'zustand'
import { Icon } from '@/assets'
import FluidEffect from '@/components/effects/FluidEffect/FluidEffect'
import { mediaQuery } from '@/utils/helpers'
import { getAccentColor, getIsDebug, setAccentColor } from '@/utils/state'
import Pointer from './Pointer'

export interface Store {
  accentColor: string
  setAccentColor: (accentColor: string) => void

  isContacts: boolean
  setIsContacts: (isContacts: boolean) => void

  isDebug: boolean
  setIsDebug: (isDebug: boolean) => void

  isPointerTouch: boolean
  setIsPointerTouch: (isPointerTouch: boolean) => void

  isPointerOut: boolean
  setIsPointerOut: (isPointerOut: boolean) => void

  isPointerDown: boolean
  setIsPointerDown: (isPointerDown: boolean) => void

  isHoveringId: string | null
  isHovering: boolean
  isHoveringIcon: Icon | null
  setIsHovering: (id: string, isHovering: boolean, icon?: Icon) => void

  pointer: Pointer
  setPointerCoords: (x: number, y: number) => void

  world: Object3D | null
  setWorld: (world: Object3D | null) => void

  screen: Mesh | null
  setScreen: (screen: Mesh | null) => void

  fluid: FluidEffect | null
  setFluid: (fluid: FluidEffect | null) => void
}

export const initialAccentColor = getAccentColor()
export const initialIsDebug = getIsDebug()
export const initialIsPointerTouch = mediaQuery('(pointer: coarse)')

const useStore = create<Store>(set => ({
  accentColor: initialAccentColor,
  setAccentColor: accentColor => {
    set({ accentColor })
    setAccentColor(accentColor)
  },

  isContacts: false,
  setIsContacts: isContacts => set({ isContacts }),

  isDebug: initialIsDebug,
  setIsDebug: isDebug => set({ isDebug }),

  isPointerTouch: initialIsPointerTouch,
  setIsPointerTouch: isPointerTouch => set({ isPointerTouch }),

  isPointerOut: true,
  setIsPointerOut: isPointerOut => set({ isPointerOut }),

  isPointerDown: false,
  setIsPointerDown: isPointerDown => set({ isPointerDown }),

  isHoveringId: null,
  isHovering: false,
  isHoveringIcon: null,
  setIsHovering: (id, isHovering, icon) =>
    set(state => {
      if (!isHovering && state.isHoveringId && state.isHoveringId !== id) return state
      state.isHoveringId = isHovering ? id : null
      state.isHovering = isHovering
      if (icon) {
        state.isHoveringIcon = isHovering ? icon : null
      }
      return state
    }),

  pointer: new Pointer(),
  setPointerCoords: (x, y) =>
    set(state => {
      state.pointer.set(x, y)
      return state
    }),

  world: null,
  setWorld: world => set({ world }),

  screen: null,
  setScreen: screen => set({ screen }),

  fluid: null,
  setFluid: fluid => set({ fluid }),
}))

export default useStore
