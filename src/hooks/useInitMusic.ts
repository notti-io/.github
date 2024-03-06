import useStore from '@/api/store'
import { useCallback } from 'react'
import { useClickAnyWhere } from 'usehooks-ts'

function useInitMusic() {
  const setMusicReady = useStore(state => state.setMusicReady)

  const onClickAnywhere = useCallback(() => setMusicReady(true), [setMusicReady])

  useClickAnyWhere(onClickAnywhere)
}

export default useInitMusic
