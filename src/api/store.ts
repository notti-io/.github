import { getIsDebug } from '@/utils/state'
import { create } from 'zustand'

export interface Store {
  isDebug: boolean
  setIsDebug: (isDebug: boolean) => void
}

export const initialIsDebug = getIsDebug()

const useStore = create<Store>(set => ({
  isDebug: initialIsDebug,
  setIsDebug: isDebug => set({ isDebug }),
}))

export default useStore
