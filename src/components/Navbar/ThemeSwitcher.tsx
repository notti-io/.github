import gsap from 'gsap'
import { useCallback, useRef } from 'react'
import useStore from '@/api/store'
import { randomHexColor } from '@/utils/helpers'
import NavbarButton from './NavbarButton'

function ThemeSwitcher() {
  const accentColor = useStore(state => state.accentColor)
  const setAccentColor = useStore(state => state.setAccentColor)
  const color = useRef(accentColor)

  const onClick = useCallback(() => {
    gsap.to(color, {
      current: randomHexColor(),
      ease: 'sine.inOut',
      duration: 1,
      onUpdate: () => {
        setAccentColor(color.current)
      },
    })
  }, [setAccentColor])

  return (
    <NavbarButton id='theme-switcher' side='right' onClick={onClick}>
      <span className='navbar-button-circle' />
    </NavbarButton>
  )
}

export default ThemeSwitcher
