import { Fragment, useEffect } from 'react'
import Controls from '@/api/Controls'
import useStore, { initialAccentColor } from '@/api/store'
import Fog from './meshes/Fog'
import { useControls } from 'leva'

const controls = Controls.create('World', {
  accentColor: {
    ...Controls.color(initialAccentColor),
    onChange(color) {
      useStore.getState().setAccentColor(color)
    },
  },
})

function World() {
  const accentColor = useStore(state => state.accentColor)
  const setWorld = useStore(state => state.setWorld)
  const [, set] = useControls(...controls.getFn())

  useEffect(() => set({ accentColor }), [set, accentColor])

  return (
    <Fragment>
      <ambientLight />
      <Fog />
      <group ref={setWorld} name='World'>
        <mesh>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial color='red' />
        </mesh>
      </group>
    </Fragment>
  )
}

export default World
