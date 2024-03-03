import useStore from '@/store'
import { useEffect } from 'react'

function useDebugWatcher() {
  const setIsDebug = useStore(state => state.setIsDebug)

  useEffect(() => {
    const listener = () => setIsDebug(window.location.hash === '#debug')

    window.addEventListener('hashchange', listener)
    return () => {
      window.removeEventListener('hashchange', listener)
    }
  }, [setIsDebug])
}

export default useDebugWatcher
