import useStore from '@/api/store'
import { useCallback } from 'react'
import NavbarButton from './NavbarButton'
import { PauseIcon, PlayIcon } from '@/assets'

function MusicToggler() {
  const musicPlaying = useStore(state => state.musicPlaying)
  const setMusicPlaying = useStore(state => state.setMusicPlaying)

  const onClick = useCallback(() => {
    setMusicPlaying(!musicPlaying)
  }, [setMusicPlaying, musicPlaying])

  return (
    <NavbarButton id='music-toggler' side='left' onClick={onClick}>
      <span className='navbar-button-icon'>{musicPlaying ? <PauseIcon /> : <PlayIcon />}</span>
    </NavbarButton>
  )
}

export default MusicToggler
