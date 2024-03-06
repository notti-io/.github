import { convertDateTZ } from '@/utils/helpers'
import { useMemo, useState } from 'react'
import { useInterval } from 'usehooks-ts'

function Clock() {
  const [date, setDate] = useState(convertDateTZ(new Date(), import.meta.env.VITE_TIME_ZONE))
  const time = useMemo(() => {
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const hoursString = hours < 10 ? `0${hours}` : hours
    const minutesString = minutes < 10 ? `0${minutes}` : minutes

    return `${hoursString}:${minutesString}`
  }, [date])

  useInterval(() => setDate(convertDateTZ(new Date(), import.meta.env.VITE_TIME_ZONE)), 1000)

  return <div className='navbar-text'>{`${import.meta.env.VITE_CITY} • ${time}`}</div>
}

export default Clock
