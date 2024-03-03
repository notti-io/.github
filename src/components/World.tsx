import { Fragment } from 'react'
import useStore from '@/api/store'
import Fog from './meshes/Fog'

function World() {
  const setWorld = useStore(state => state.setWorld)

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
