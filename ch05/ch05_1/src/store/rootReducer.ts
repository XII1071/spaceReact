import {Action} from 'redux'
import {AppState} from './AppState'
import {Actions} from './actions'

const initialAppState = {
  today: new Date()
}

// Redux store를 생성하기 위해 Reducer 라는 객체 생성이 필수
// prettier-ignore
export const rootReducer =
    //   function (prevState: AppState = initialAppState, action: Action) {
    //     const newState = {...prevState} // ... 깊은 복사
    //   return newState
// }
  function (state: AppState = initialAppState, action: Actions) {
    switch (action.type) {
      case "setToday": {
        return {...state, today: action.today}
        }        
    }
    return state // 필수
    }
