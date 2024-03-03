import useDebug from '@/api/store'
import { Leva } from 'leva'

function LevaGui() {
  const isDebug = useDebug(state => state.isDebug)

  return <Leva hideCopyButton collapsed hidden={!isDebug} titleBar={{ title: import.meta.env.VITE_NICK_NAME }} />
}

export default LevaGui
