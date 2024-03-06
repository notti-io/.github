import { useEffect } from 'react'
import { suspend } from 'suspend-react'
import useStore from '@/api/store'
import { musics } from '@/assets'

async function createAudio(url: string) {
  const res = await fetch(url)
  const buffer = await res.arrayBuffer()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const context = new (window.AudioContext || (window as any).webkitAudioContext)()
  const source = context.createBufferSource()
  source.buffer = await new Promise(res => context.decodeAudioData(buffer, res))
  const gain = context.createGain()
  const analyser = context.createAnalyser()
  gain.gain.value = 0.2
  analyser.fftSize = 64
  source.connect(analyser)
  analyser.connect(gain)
  let started = false
  return {
    context,
    gain,
    source,
    play: () => {
      if (!started) {
        source.start(0)
        started = true
      } else {
        context.resume()
      }
    },
    pause: () => {
      if (!started) return
      context.suspend()
    },
  }
}

function Audio() {
  const musicReady = useStore(state => state.musicReady)
  const musicPlaying = useStore(state => state.musicPlaying)
  const musicIndex = useStore(state => state.musicIndex)
  const playNextMusic = useStore(state => state.playNextMusic)
  const { context, gain, source, play, pause } = suspend(() => createAudio(musics[musicIndex].url), [musicIndex])

  useEffect(() => {
    gain.connect(context.destination)
    return () => {
      gain.disconnect()
    }
  }, [gain, context])

  useEffect(() => {
    source.onended = () => playNextMusic()
    return () => {
      source.onended = null
    }
  }, [playNextMusic, source])

  useEffect(() => {
    if (!musicReady) return
    if (musicPlaying) play()
    else pause()
  }, [musicReady, musicPlaying, play, pause])

  return null
}

export default Audio
