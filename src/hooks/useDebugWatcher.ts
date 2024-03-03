import useDebug from '@/stores/debug'
import { useEffect } from 'react'

function useDebugWatcher() {
  const setIsDebug = useDebug(state => state.setIsDebug)

  useEffect(() => {
    const listener = () => setIsDebug(window.location.hash === '#debug')

    window.addEventListener('hashchange', listener)
    return () => {
      window.removeEventListener('hashchange', listener)
    }
  }, [setIsDebug])
}

export default useDebugWatcher
