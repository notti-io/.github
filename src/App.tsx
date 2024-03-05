import { Fragment } from 'react'
import Experience from '@/components/Experience'
import Content from './components/Content'
import Navbar from './components/Navbar'
import LevaGui from '@/components/LevaGui'
import Cursor from '@/components/Cursor'
import useDebug from '@/hooks/useDebug'
import usePointer from '@/hooks/usePointer'
import '@/App.scss'

function App() {
  useDebug()
  usePointer()

  return (
    <Fragment>
      <Experience />
      <Content />
      <Navbar />
      <LevaGui />
      <Cursor />
    </Fragment>
  )
}

export default App
