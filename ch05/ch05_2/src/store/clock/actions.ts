import type * as T from './types'

export const setClock = function (payload: T.State): T.SetClockAction {
  return {
    type: '@clock/setClock',
    payload
  } //즉시 실행문
}
