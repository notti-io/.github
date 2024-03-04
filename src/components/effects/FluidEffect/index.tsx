import { useControls } from 'leva'
import { Fragment, useRef } from 'react'
import { BlendFunction } from 'postprocessing'
import Controls from '@/api/Controls'
import useStore from '@/api/store'
import { default as Ref } from './FluidEffect'
import FluidSimulation from './FluidSimulation'
import FluidMouse from './FluidMouse'

const controls = Controls.folder('PostProcessing', 'Fluid', {
  densityDissipation: Controls.num(FluidSimulation.DEFAULT_DENSITY_DISSIPATION),
  velocityDissipation: Controls.num(FluidSimulation.DEFAULT_VELOCITY_DISSIPATION),
  pressureDissipation: Controls.num(FluidSimulation.DEFAULT_PRESSURE_DISSIPATION),
  pressureIterations: Controls.num(FluidSimulation.DEFAULT_PRESSURE_ITERATIONS, 1, 64, 1),
  curl: Controls.num(FluidSimulation.DEFAULT_CURL, 0, 100),
  dt: Controls.num(FluidSimulation.DEFAULT_DT),
  splatRadius: Controls.num(FluidSimulation.DEFAULT_SPLAT_RADIUS),
  isAdditive: Controls.bool(FluidSimulation.DEFAULT_IS_ADDITIVE),
  scaleBasedOnVelocity: Controls.bool(FluidMouse.DEFAULT_SCALE_BASED_ON_VELOCITY),
  scale: Controls.num(FluidMouse.DEFAULT_SCALE, 0, 10),
  blendFunction: Controls.select(Ref.DEFAULT_BLEND_FUNCTION, BlendFunction),
})

function FluidEffect({ enabled }: { enabled: boolean }) {
  const ref = useRef<Ref>(null)
  const args = useControls(...controls.get())
  const pointer = useStore(state => state.pointer)

  if (!enabled) return <Fragment />

  return (
    <fluidEffect
      ref={ref}
      args={[pointer, args.blendFunction as BlendFunction]}
      densityDissipation={args.densityDissipation}
      velocityDissipation={args.velocityDissipation}
      pressureDissipation={args.pressureDissipation}
      pressureIterations={args.pressureIterations}
      curl={args.curl}
      dt={args.dt}
      splatRadius={args.splatRadius}
      isAdditive={args.isAdditive}
      scaleBasedOnVelocity={args.scaleBasedOnVelocity}
      scale={args.scale}
    />
  )
}

export default FluidEffect
