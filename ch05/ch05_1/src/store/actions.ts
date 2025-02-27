import {Action} from 'redux'

// Action에 대한 분기를 설정(switch case문 활용함)
export type SetTodayAction = Action<'setToday'> & {today: Date}

// 리덕스 저장소에 저장된 앱수준상태의 일부 속성값을 변경하려면 일단 액션을 만들것!
// 그리고, 액션은 반드시 dispatch()로 리덕스 저장소에 전달
// 액션이  리덕스 저장소에 전달될 때 리듀서가 관여함.
export type Actions = SetTodayAction
