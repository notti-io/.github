import { convertDateTZ } from '@/utils/helpers'
import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { useInterval } from 'usehooks-ts'

export interface ClockProps {
  timeZone: string
  children: (time: string) => ReactNode
}

function Clock({ timeZone, children }: ClockProps) {
  const [date, setDate] = useState(convertDateTZ(new Date(), timeZone))
  const time = useMemo(() => {
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const hoursString = hours < 10 ? `0${hours}` : hours
    const minutesString = minutes < 10 ? `0${minutes}` : minutes

    return `${hoursString}:${minutesString}`
  }, [date])

  useInterval(() => {
    setDate(convertDateTZ(new Date(), timeZone))
  }, 1000)

  return children(time)
}

export default Clock
