import type * as T from './types'

export const setCounter = function (payload: T.State): T.SetCounterAction {
  return {
    type: '@counter/setCounter',
    payload
  } //즉시 실행문
}
// prettier-ignore
export const increaseCounter = () => setCounter(1)
// prettier-ignore
export const decreaseCounter = () => setCounter(-1)
