import { Suspense, useEffect, useMemo } from 'react'
import { suspend } from 'suspend-react'
import useStore from '@/api/store'
import { musics } from '@/assets'

function getAudioContext() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return new (window.AudioContext || (window as any).webkitAudioContext)()
}

function createAudio(buffer: AudioBuffer) {
  const context = getAudioContext()
  const source = context.createBufferSource()
  const gain = context.createGain()
  const analyser = context.createAnalyser()
  source.buffer = buffer
  source.connect(analyser)
  gain.gain.value = 0.2
  analyser.fftSize = 64
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

function AudioAnalyser({ buffer }: { buffer: AudioBuffer }) {
  const musicPlaying = useStore(state => state.musicPlaying)
  const playNextMusic = useStore(state => state.playNextMusic)
  const { context, gain, source, play, pause } = useMemo(() => createAudio(buffer), [buffer])

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
    if (musicPlaying) play()
    else pause()
  }, [musicPlaying, play, pause])

  return null
}

async function loadAudio(url: string) {
  const res = await fetch(url)
  const buffer = await res.arrayBuffer()
  const context = getAudioContext()
  return await new Promise<AudioBuffer | null>(res => context.decodeAudioData(buffer, res, () => res(null)))
}

function AudioProvider({ url }: { url: string }) {
  const buffer = suspend(() => loadAudio(url), [url])

  if (!buffer) return null

  return <AudioAnalyser buffer={buffer} />
}

function Audio() {
  const musicReady = useStore(state => state.musicReady)
  const musicIndex = useStore(state => state.musicIndex)

  if (!musicReady) return null

  return (
    <Suspense fallback={null}>
      <AudioProvider url={musics[musicIndex].url} />
    </Suspense>
  )
}

export default Audio
