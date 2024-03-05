import gsap from 'gsap'
import { useCallback, useRef } from 'react'
import useStore from '@/api/store'
import { useCursor } from '@/hooks/useCursor'
import { hslToHex, random } from '@/utils/helpers'

function randomHexColor() {
  const hue = random(0, 360)
  return hslToHex(hue, 100, 50)
}

function ThemeSwitcher() {
  const ref = useRef<HTMLButtonElement>(null)
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

  useCursor('theme-switcher', ref)

  return (
    <button ref={ref} className='theme-switcher' onClick={onClick}>
      <span className='theme-switcher-circle' />
      <span className='theme-switcher-aura' />
    </button>
  )
}

export default ThemeSwitcher
