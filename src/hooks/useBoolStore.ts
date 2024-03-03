import { useCallback } from 'react'

function useBoolStore(action: (value: boolean) => void) {
  const setTrue = useCallback(() => action(true), [action])
  const setFalse = useCallback(() => action(false), [action])

  return [setTrue, setFalse] as const
}

export default useBoolStore
