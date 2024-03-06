import { useCallback } from 'react'
import useStore from '@/api/store'
import { randomHexColor } from '@/utils/helpers'
import NavbarButton from './NavbarButton'

function ThemeSwitcher() {
  const setAccentColor = useStore(state => state.setAccentColor)

  const onClick = useCallback(() => setAccentColor(randomHexColor()), [setAccentColor])

  return (
    <NavbarButton id='theme-switcher' side='right' onClick={onClick}>
      <span className='navbar-button-circle' />
    </NavbarButton>
  )
}

export default ThemeSwitcher
