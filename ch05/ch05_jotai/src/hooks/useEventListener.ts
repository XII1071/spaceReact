import {useEffect} from 'react'

export const useEventListener = (
  // & 교차 타입: 2개 이상의 타입을 결합하여 모두 다 사용
  // | 합집합타입: 2개 이상의 타입을 결합하여 그 중에 하나를 사용
  target: EventTarget | null, //  대상(window, button, input 등)
  type: string, // 이벤트 타입
  callback: EventListenerOrEventListenerObject | null //콜백함수
) => {
  useEffect(() => {
    if (target && callback) {
      target.addEventListener(type, callback)
      return () => target.removeEventListener(type, callback)
    }
  }, [target, type, callback])
}
