import { Vignette as VignetteImpl } from '@react-three/postprocessing'
import { useControls } from 'leva'
import { BlendFunction } from 'postprocessing'
import { Fragment } from 'react'
import Controls from '@/api/Controls'

const controls = Controls.folder('PostProcessing', 'Vignette', {
  eskil: Controls.bool(false),
  offset: Controls.num(0.61),
  darkness: Controls.num(0.36),
  blendFunction: Controls.select(BlendFunction.NORMAL, BlendFunction),
})

function Vignette({ enabled }: { enabled: boolean }) {
  const args = useControls(...controls.get())

  if (!enabled) return <Fragment />

  return <VignetteImpl eskil={args.eskil} offset={args.offset} darkness={args.darkness} blendFunction={args.blendFunction as BlendFunction} />
}

export default Vignette
