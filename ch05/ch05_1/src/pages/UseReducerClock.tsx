import {useReducer} from 'react'
import {Div, Title, Subtitle} from '../components'
import {AppState} from '../store'
import {SetTodayAction} from '../store/actions'
import {useInterval} from '../hooks'

export default function UseReducerClock() {
  const [{today}, dispatch] = useReducer(
    function (state: AppState, action: SetTodayAction) {
      switch (action.type) {
        case 'setToday':
          return {...state, today: new Date()}
      }
      return state
    },
    {today: new Date()}
  )
  useInterval(() => {
    dispatch({type: 'setToday', today: new Date()})
  })

  return (
    <Div className="flex flex-col items-center justify-center mt-16">
      <Title className="text-5xl">UseReducerClock</Title>
      <Title className="mt-4 text-3xl">{today.toLocaleTimeString()}</Title>
      <Subtitle className="mt-4 text-2xl">{today.toLocaleDateString()}</Subtitle>
    </Div>
  )
}
