import { create } from 'zustand'

export interface StoreState {
  isDebug: boolean
}

export interface StoreActions {
  setIsDebug: (isDebug: boolean) => void
}

export type Store = StoreState & StoreActions

export const initialIsDebug = import.meta.env.DEV || window.location.hash === '#debug'
export const initialState: StoreState = {
  isDebug: initialIsDebug,
}

const useStore = create<Store>(set => ({
  ...initialState,
  setIsDebug: isDebug => set({ isDebug }),
}))

export default useStore
