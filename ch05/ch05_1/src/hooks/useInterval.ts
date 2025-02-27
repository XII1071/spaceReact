import {useEffect} from 'react'

// callback function(콜백함수): 함수 형태인 매개변수. () => setToday(new Date())
export const useInterval = function (callback: () => void, duration: number = 1000) {
  useEffect(() => {
    const id = setInterval(callback, duration)
    return () => clearInterval(id)
  }, [callback, duration])
}
