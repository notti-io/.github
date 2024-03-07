import { useFrame } from '@react-three/fiber'
import { Suspense, useEffect, useMemo } from 'react'
import { suspend } from 'suspend-react'
import Shader from '@/api/Shader'
import useStore from '@/api/store'
import { musics } from '@/assets'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AudioContext = window.AudioContext || (window as any).webkitAudioContext
const context = new AudioContext()

function createAudio(buffer: AudioBuffer) {
  const source = context.createBufferSource()
  const gain = context.createGain()
  const analyser = context.createAnalyser()
  const data = new Uint8Array(analyser.frequencyBinCount)
  source.buffer = buffer
  gain.gain.value = 0.2
  analyser.fftSize = 64
  let started = false
  let isPlaying = false
  return {
    createEffect() {
      source.connect(analyser)
      gain.connect(context.destination)
      analyser.connect(gain)
      return () => {
        source.disconnect()
        gain.disconnect()
        analyser.disconnect()
      }
    },
    subscribeEnd(callback: () => void) {
      source.onended = callback
      return () => {
        source.onended = null
      }
    },
    setPlaying(playing: boolean) {
      isPlaying = playing
      if (playing) {
        if (!started) {
          source.start(0)
          started = true
        } else {
          context.resume()
        }
      } else {
        if (!started) return
        context.suspend()
      }
    },
    updateData() {
      if (!isPlaying) return 0
      analyser.getByteFrequencyData(data)
      let sum = 0
      for (let i = 0; i < data.length; i++) {
        sum += data[i]
      }
      return sum / data.length / 5
    },
  }
}

function AudioAnalyser({ buffer }: { buffer: AudioBuffer }) {
  const musicPlaying = useStore(state => state.musicPlaying)
  const playNextMusic = useStore(state => state.playNextMusic)
  const { createEffect, subscribeEnd, setPlaying, updateData } = useMemo(() => createAudio(buffer), [buffer])

  useEffect(createEffect, [createEffect])
  useEffect(() => subscribeEnd(playNextMusic), [subscribeEnd, playNextMusic])
  useEffect(() => setPlaying(musicPlaying), [setPlaying, musicPlaying])

  useFrame(() => Shader.translateAudioFrequency(updateData()))

  return null
}

async function createAudionBuffer(url: string) {
  const res = await fetch(url)
  const buffer = await res.arrayBuffer()
  return await new Promise<AudioBuffer | null>(res => context.decodeAudioData(buffer, res, () => res(null)))
}

function AudioProvider({ url }: { url: string }) {
  const buffer = suspend(() => createAudionBuffer(url), [url])

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
