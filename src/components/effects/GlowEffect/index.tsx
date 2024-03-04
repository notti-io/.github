import { BlendFunction } from 'postprocessing'
import { useControls } from 'leva'
import { Fragment } from 'react'
import Controls from '@/api/Controls'
import useStore from '@/api/store'
import GlowEffectImpl from './GlowEffect'

const controls = Controls.folder('PostProcessing', 'Glow', {
  blendFunction: Controls.select(GlowEffectImpl.DEFAULT_BLEND_FUNCTION, BlendFunction),
})

function GlowEffect({ enabled }: { enabled: boolean }) {
  const args = useControls(...controls.get())
  const accentColor = useStore(state => state.accentColor)
  const isPointerTouch = useStore(state => state.isPointerTouch)

  if (!enabled) return <Fragment />

  return <glowEffect args={[args.blendFunction as BlendFunction]} color={accentColor} phone={Number(isPointerTouch)} />
}

export default GlowEffect
