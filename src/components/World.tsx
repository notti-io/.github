import { Fragment } from 'react'
import useStore from '@/api/store'

function World() {
  const setWorld = useStore(state => state.setWorld)

  return (
    <Fragment>
      <ambientLight />
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
