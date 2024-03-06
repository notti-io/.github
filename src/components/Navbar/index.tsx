import { Fragment } from 'react'
import ThemeSwitcher from './ThemeSwitcher'
import Clock from './Clock'
import ContactsButton from '../Contacts/ContactsButton'
import MusicToggler from './MusicToggler'

function Navbar() {
  return (
    <Fragment>
      <div className='navbar'>
        <div className='navbar-item'>
          <div className='navbar-text'>{import.meta.env.VITE_NICK_NAME}</div>
        </div>
        <div className='navbar-item'>
          <Clock />
        </div>
        <div className='navbar-item'>
          <ContactsButton />
        </div>
      </div>
      <MusicToggler />
      <ThemeSwitcher />
    </Fragment>
  )
}

export default Navbar
