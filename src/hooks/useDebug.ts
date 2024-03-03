import useStore from '@/api/store'
import { getIsDebug } from '@/utils/state'
import { useEffect } from 'react'

function useDebug() {
  const setIsDebug = useStore(state => state.setIsDebug)

  useEffect(() => {
    if (!window) return

    const listener = () => setIsDebug(getIsDebug())

    window.addEventListener('hashchange', listener)
    return () => {
      window.removeEventListener('hashchange', listener)
    }
  }, [setIsDebug])
}

export default useDebug
