import {Action} from 'redux'
import {AppState} from './AppState'

const initialAppState = {
  today: new Date()
}

// store라는 객체 생성
export const rootReducer = function (state: AppState = initialAppState, action: Action) {
  return state
}
