import type {Action} from 'redux'

export type State = string
// payload:순수한 데이터
export type SetClockAction = Action<'@clock/setClock'> & {payload: State}
//SetClockAction의 구조 예: {type: '@clock/setClock', payload}
export type Actions = SetClockAction
