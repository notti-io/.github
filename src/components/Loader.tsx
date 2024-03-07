import { animate, motion, useMotionValue } from 'framer-motion'
import { Fragment, PropsWithChildren, useEffect, useRef } from 'react'
import useStore from '@/api/store'
import Shader from '@/api/Shader'

function Loader({ children }: PropsWithChildren) {
  const counterRef = useRef<HTMLElement>(null)
  const isLoading = useStore(state => state.isLoading)
  const setIsLoading = useStore(state => state.setIsLoading)
  const y = useMotionValue('0%')
  const display = useMotionValue('block')

  useEffect(() => {
    const controls = animate(0, 100, {
      ease: 'easeInOut',
      duration: 1,
      delay: 0.3,
      onUpdate(value) {
        if (counterRef.current) {
          counterRef.current.textContent = `${Math.round(value)}%`
        }
      },
      onComplete() {
        animate(y, '100%', {
          ease: 'easeInOut',
          duration: 0.6,
          delay: 0.3,
          onComplete() {
            Shader.translateLoader(() => setIsLoading(false))
            display.set('none')
          },
        })
      },
    })

    return () => controls.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setIsLoading])

  return (
    <Fragment>
      <motion.div className='loader' style={{ display }}>
        <motion.div style={{ y }}>
          <span ref={counterRef}>0%</span>
        </motion.div>
      </motion.div>
      {!isLoading && children}
    </Fragment>
  )
}

export default Loader
