import { GodRays as GodRaysImpl } from '@react-three/postprocessing'
import { useControls } from 'leva'
import { BlendFunction, KernelSize } from 'postprocessing'
import { Fragment } from 'react'
import type { Mesh } from 'three'
import Controls from '@/api/Controls'

const controls = Controls.folder('PostProcessing', 'GodRays', {
  samples: Controls.num(30, 0, 100, 1),
  density: Controls.num(0.15),
  decay: Controls.num(0.8),
  weight: Controls.num(0.8),
  exposure: Controls.num(0.3),
  clampMax: Controls.num(1),
  blur: true,
  kernelSize: Controls.select(KernelSize.LARGE, KernelSize),
  blendFunction: Controls.select(BlendFunction.SCREEN, BlendFunction),
})

function GodRaysEffect({ enabled, screen }: { enabled: boolean; screen: Mesh | null }) {
  const args = useControls(...controls.get())

  if (!screen || !enabled) return <Fragment />

  return (
    <GodRaysImpl
      sun={screen}
      samples={args.samples}
      density={args.density}
      decay={args.decay}
      weight={args.weight}
      exposure={args.exposure}
      clampMax={args.clampMax}
      blur={args.blur}
      kernelSize={args.kernelSize as KernelSize}
      blendFunction={args.blendFunction as BlendFunction}
    />
  )
}

export default GodRaysEffect
