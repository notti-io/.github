import { Noise as NoiseImpl } from '@react-three/postprocessing'
import { useControls } from 'leva'
import { Fragment } from 'react'
import { BlendFunction } from 'postprocessing'
import Controls from '@/api/Controls'

const controls = Controls.folder('PostProcessing', 'Noise', {
  premultiply: Controls.bool(true),
  blendFunction: Controls.select(BlendFunction.AVERAGE, BlendFunction),
})

function NoiseEffect({ enabled }: { enabled: boolean }) {
  const args = useControls(...controls.get())

  if (!enabled) return <Fragment />

  return <NoiseImpl premultiply={args.premultiply} blendFunction={args.blendFunction as BlendFunction} />
}

export default NoiseEffect
