import {useDispatch, useSelector} from 'react-redux'
import {AppState} from '../store/AppState'
import {Div, Title, Subtitle} from '../components'
import {useInterval} from '../hooks'

export default function ReduxClock() {
  // 저장소의 특정 값을 불러올 때, 리렌더링 될 때 Date의 갱신된 값을 가져옴.
  // <AppState, Date> AppState 타입의 속성이 Date타입인 것
  const today = useSelector<AppState, Date>(state => state.today)
  // 저장소에 데이터를 보내기 위한 객체 생성
  const dispatch = useDispatch() // 갱신이 목적
  useInterval(function () {
    dispatch({type: 'setToday', today: new Date()})
  })

  return (
    <Div className="flex flex-col items-center justify-center mt-16">
      <Title className="text-5xl">ReduxClock</Title>
      <Title className="mt-4 text-3xl">{today.toLocaleTimeString()}</Title>
      <Subtitle className="mt-4 text-2xl">{today.toLocaleDateString()}</Subtitle>
    </Div>
  )
}
