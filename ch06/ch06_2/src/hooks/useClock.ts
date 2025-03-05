import {useState} from 'react'
import {useInterval} from './useInterval'

export const useClock = function () {
  const [today, setToday] = useState(new Date())
  useInterval(() => setToday(new Date()))
  return today
}
