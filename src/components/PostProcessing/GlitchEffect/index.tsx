import { useTexture } from '@react-three/drei'
import { useControls } from 'leva'
import { Fragment, useLayoutEffect, useRef } from 'react'
import { BlendFunction } from 'postprocessing'
import { RepeatWrapping } from 'three'
import Controls from '@/api/Controls'
import useStore from '@/api/store'
import useFluid from '@/hooks/useFluid'
import GlitchEffectImpl from './GlitchEffect'

const glitchTexture = '/textures/glitch.jpg'

const controls = Controls.folder('PostProcessing', 'Glitch', {
  enabled: Controls.bool(true),
  scale: Controls.num(GlitchEffectImpl.DEFAULT_SCALE, 0, 10),
  distort: Controls.num(GlitchEffectImpl.DEFAULT_DISTORT),
  blendFunction: Controls.select(GlitchEffectImpl.DEFAULT_BLEND_FUNCTION, BlendFunction),
})

function GlitchEffect({ enabled }: { enabled: boolean }) {
  const ref = useRef<GlitchEffectImpl>(null)
  const args = useControls(...controls.get())
  const isContacts = useStore(state => state.isContacts)
  const accentColor = useStore(state => state.accentColor)
  const texture = useTexture(glitchTexture)
  const [fluid, fluidMask] = useFluid()

  useLayoutEffect(() => {
    texture.wrapS = texture.wrapT = RepeatWrapping
    texture.needsUpdate = true
  }, [texture])

  useLayoutEffect(() => {
    if (!ref.current) return
    ref.current.translateProgress(Number(isContacts))
  }, [isContacts])

  if (!enabled) return <Fragment />

  return (
    <glitchEffect
      ref={ref}
      args={[args.blendFunction as BlendFunction]}
      map={texture}
      fluid={fluid}
      fluidMask={fluidMask}
      scale={args.scale}
      distort={args.distort}
      color={accentColor}
    />
  )
}

useTexture.preload(glitchTexture)

export default GlitchEffect
