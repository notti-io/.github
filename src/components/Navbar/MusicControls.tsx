import { animate, motion, useMotionValue } from 'framer-motion'
import { useEffect, useMemo, useRef } from 'react'
import useStore from '@/api/store'
import { NextIcon, musics } from '@/assets'
import { useCursor } from '@/hooks/useCursor'
import NavbarButton from './NavbarButton'

function MusicControls() {
  const ref = useRef<HTMLAnchorElement>(null)
  const musicPlaying = useStore(state => state.musicPlaying)
  const musicIndex = useStore(state => state.musicIndex)
  const playPrevMusic = useStore(state => state.playPrevMusic)
  const playNextMusic = useStore(state => state.playNextMusic)
  const title = useMemo(() => {
    const title = musics[musicIndex].url.replace('/musics/', '').replace('.mp3', '')
    if (title.startsWith('Rick Astley')) {
      return `............. ${title}`
    }
    return title
  }, [musicIndex])
  const href = useMemo(() => musics[musicIndex].href, [musicIndex])
  const x = useMotionValue('0%')

  useEffect(() => {
    x.stop()
    x.set('0%')
    if (musicPlaying) {
      animate(x, '-100%', {
        ease: 'linear',
        duration: title.length / 5,
        repeat: Infinity,
        repeatDelay: 5,
        delay: 5,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [musicPlaying, title])

  useCursor('music-link', ref, 'Music')

  return (
    <div className='music-controls'>
      <NavbarButton id='play-next' onClick={playPrevMusic} side='left' fixed={false}>
        <span className='navbar-button-icon navbar-button-icon-big' style={{ transform: 'rotate(180deg)', transformOrigin: 'center center' }}>
          <NextIcon />
        </span>
      </NavbarButton>
      <a ref={ref} href={href} target='_blank' rel='noopener' className='music-controls-text'>
        <motion.div className='music-controls-text-line' style={{ x }}>
          {title}&nbsp;&nbsp;&nbsp;
        </motion.div>
        <motion.div className='music-controls-text-line' style={{ x }}>
          {title}&nbsp;&nbsp;&nbsp;
        </motion.div>
      </a>
      <NavbarButton id='play-next' onClick={playNextMusic} side='right' fixed={false}>
        <span className='navbar-button-icon navbar-button-icon-big'>
          <NextIcon />
        </span>
      </NavbarButton>
    </div>
  )
}

export default MusicControls
