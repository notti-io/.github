import { useCallback, useRef } from 'react'
import useStore from '@/api/store'
import { hslToHex, random } from '@/utils/helpers'
import gsap from 'gsap'

function randomHexColor() {
  const hue = random(0, 360)
  return hslToHex(hue, 100, 50)
}

function ThemeSwitcher() {
  const accentColor = useStore(state => state.accentColor)
  const setAccentColor = useStore(state => state.setAccentColor)
  const ref = useRef(accentColor)

  const onClick = useCallback(() => {
    gsap.to(ref, {
      current: randomHexColor(),
      ease: 'sine.inOut',
      duration: 1,
      onUpdate: () => {
        setAccentColor(ref.current)
      },
    })
  }, [setAccentColor])

  return (
    <button className='theme-switcher' onClick={onClick}>
      <span className='theme-switcher-circle' />
      <span className='theme-switcher-aura' />
    </button>
  )
}

export default ThemeSwitcher
