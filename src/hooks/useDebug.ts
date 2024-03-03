import { useCallback } from 'react'
import useStore from '@/api/store'
import { getIsDebug } from '@/utils/state'
import { useEventListener } from 'usehooks-ts'

function useDebug() {
  const setIsDebug = useStore(state => state.setIsDebug)

  const onHashChange = useCallback(() => setIsDebug(getIsDebug()), [setIsDebug])

  useEventListener('hashchange', onHashChange)
}

export default useDebug
