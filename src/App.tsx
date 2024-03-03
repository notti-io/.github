import { Fragment } from 'react'
import Experience from '@/components/Experience'
import LevaGui from '@/components/Debug/LevaGui'
import '@/App.scss'

function App() {
  return (
    <Fragment>
      <Experience />
      <LevaGui />
    </Fragment>
  )
}

export default App
