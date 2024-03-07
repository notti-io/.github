import { PropsWithChildren, useEffect, useRef } from 'react'
import useStore from '@/api/store'
import Shader from '@/api/Shader'

function Loader({ children }: PropsWithChildren) {
  const isLoading = useStore(state => state.isLoading)
  const timeout = useRef<NodeJS.Timeout | null>(null)
  const setIsLoading = useStore(state => state.setIsLoading)

  useEffect(() => {
    if (timeout.current) {
      clearTimeout(timeout.current)
      timeout.current = null
    }
    timeout.current = setTimeout(() => {
      Shader.translateLoader(() => setIsLoading(false))
    }, 1000)

    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current)
        timeout.current = null
      }
    }
  }, [setIsLoading])

  if (isLoading) return null

  return children
}

export default Loader
