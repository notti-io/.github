import { useControls } from 'leva'
import { Fragment } from 'react'
import Controls from '@/api/Controls'

const controls = Controls.folder('World', 'Fog', {
  color: Controls.color('#202020'),
  near: Controls.num(0.01, 0, 100),
  far: Controls.num(20, 0, 100),
})

function Fog() {
  const args = useControls(...controls.get())

  return (
    <Fragment>
      <color attach='background' args={[args.color]} />
      <fog attach='fog' color={args.color} near={args.near} far={args.far} />
    </Fragment>
  )
}

export default Fog
