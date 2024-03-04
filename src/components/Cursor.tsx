import { useCallback, useMemo, useRef } from 'react'
import useStore from '@/api/store'
import useAnimationFrame from '@/hooks/useAnimationFrame'
import { classNames } from '@/utils/helpers'

const dotRadius = 4
const dotDiameter = dotRadius * 2
const auraRadius = 30
const auraDiameter = auraRadius * 2

function Cursor() {
  const isTouch = useStore(state => state.isPointerTouch)
  const isOut = useStore(state => state.isPointerOut)
  const isDown = useStore(state => state.isPointerDown)
  const isHovering = useStore(state => state.isHovering)
  const isLoading = false
  const pointer = useStore(state => state.pointer)

  const mouseRef = useRef<HTMLDivElement>(null)
  const auraContainerRef = useRef<HTMLDivElement>(null)
  const auraRef = useRef<HTMLDivElement>(null)

  const auraPosition = useRef({ x: -auraRadius, y: -auraRadius })

  const containerClassName = useMemo(
    () =>
      classNames([
        'cursor-container',
        isOut && 'cursor-out',
        isDown && 'cursor-down',
        isHovering && 'cursor-hovering',
        isLoading && 'cursor-loading',
      ]),
    [isLoading, isDown, isHovering, isOut],
  )

  const frame = useCallback(() => {
    if (!mouseRef.current || !auraContainerRef.current || !auraRef.current) return

    mouseRef.current.style.left = `${pointer.baseX - dotRadius}px`
    mouseRef.current.style.top = `${pointer.baseY - dotRadius}px`

    const diffX = Math.round(pointer.baseX - auraPosition.current.x)
    const diffY = Math.round(pointer.baseY - auraPosition.current.y)
    const distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2))
    const angle = (Math.atan2(diffY, diffX) * 180) / Math.PI
    const squeeze = Math.min(distance / 1000, 0.15)

    auraPosition.current = {
      x: auraPosition.current.x + diffX * 0.1,
      y: auraPosition.current.y + diffY * 0.1,
    }
    auraContainerRef.current.style.left = `${auraPosition.current.x - auraRadius}px`
    auraContainerRef.current.style.top = `${auraPosition.current.y - auraRadius}px`

    auraRef.current.style.transform = `rotate(${angle}deg) scale(${1 + squeeze}, ${1 - squeeze})`
  }, [pointer])

  useAnimationFrame(frame, !isTouch)

  if (isTouch) return null

  return (
    <div className={containerClassName}>
      <div ref={mouseRef} className='cursor-dot' style={{ width: dotDiameter, height: dotDiameter }} />
      <div ref={auraContainerRef} className='cursor-aura-container' style={{ width: auraDiameter, height: auraDiameter }}>
        <div ref={auraRef} className='cursor-aura' />
      </div>
    </div>
  )
}

export default Cursor
