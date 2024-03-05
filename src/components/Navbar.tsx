import { Fragment } from 'react'
import ThemeSwitcher from './ThemeSwitcher'

function Navbar() {
  return (
    <Fragment>
      <div className='navbar'>
        <div className='navbar-item'>
          <div className='navbar-text'>{import.meta.env.VITE_NICK_NAME}</div>
        </div>
        <div className='navbar-item'>
          <div className='navbar-text'>{import.meta.env.VITE_CITY} (11:26)</div>
        </div>
        <div className='navbar-item'>
          <div className='navbar-text'>Contacts</div>
        </div>
      </div>
      <ThemeSwitcher />
    </Fragment>
  )
}

export default Navbar
