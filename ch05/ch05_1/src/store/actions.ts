import {Action} from 'redux'

// Action에 대한 분기를 설정(switch case문 활용함)
export type SetTodayAction = Action<'setToday'> & {today: Date}

export type Actions = SetTodayAction
