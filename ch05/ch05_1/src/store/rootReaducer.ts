// 3) 리덕스저장소를 AppState 타입 데이터를 저장하는 공간을 생성하려면 reducer라는 함수를 정의.
// Reducer는 State와 action이라는 2가지 매개변수로 새로운 상태를 만들어서 반환.

import {Action} from 'redux'
import {AppState} from './AppState'

const initialAppState = {today: new Date()} // 사용할 변수 초기화

// action 플럭스에서 나온 용어 type이라는 이름이 있는 속성을 가진 평범한 js 객체
export const rootReducer = function (state: AppState = initialAppState, action: Action) => {
  return state
}
