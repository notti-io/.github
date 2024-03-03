import { create } from 'zustand'

interface State {
  isDebug: boolean
  setIsDebug: (isDebug: boolean) => void
}

export const initialIsDebug = import.meta.env.DEV || window.location.hash === '#debug'

const useDebug = create<State>(set => ({
  isDebug: initialIsDebug,
  setIsDebug: isDebug => set({ isDebug }),
}))

export default useDebug
