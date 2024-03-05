import { Fragment } from 'react'
import Experience from '@/components/Experience'
import LevaGui from '@/components/LevaGui'
import Cursor from '@/components/Cursor'
import useDebug from '@/hooks/useDebug'
import usePointer from '@/hooks/usePointer'
import '@/App.scss'
import Navbar from './components/Navbar'

function App() {
  useDebug()
  usePointer()

  return (
    <Fragment>
      <Experience />
      <Navbar />
      <LevaGui />
      <Cursor />
    </Fragment>
  )
}

export default App
