function Navbar() {
  return (
    <div className='navbar'>
      <div className='navbar-section navbar-section-top'>
        <div className='navbar-section-item'>
          <div className='navbar-text'>{import.meta.env.VITE_NICK_NAME}</div>
        </div>
        <div className='navbar-section-item'>
          <div className='navbar-text'>{import.meta.env.VITE_CITY} (11:26)</div>
        </div>
        <div className='navbar-section-item'>
          <div className='navbar-text'>Contacts</div>
        </div>
      </div>
      <div className='navbar-section navbar-section-bottom'>
        <div className='navbar-section-item'>{/* TODO: SOUND BUTTON */}</div>
        <div className='navbar-section-item'>{/* TODO: THEME SWITCHER */}</div>
      </div>
    </div>
  )
}

export default Navbar
