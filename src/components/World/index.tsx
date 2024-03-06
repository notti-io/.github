import { Fragment, useEffect } from 'react'
import { useControls } from 'leva'
import Controls from '@/api/Controls'
import useStore, { initialAccentColor } from '@/api/store'
import Fog from './Fog'
import Audio from './Audio'
import Fallout from './Fallout'
import Hero from './Hero'

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
      <Audio />
      <group ref={setWorld} name='World'>
        <Fallout />
        <Hero />
      </group>
    </Fragment>
  )
}

export default World
