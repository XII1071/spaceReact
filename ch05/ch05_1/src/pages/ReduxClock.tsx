import {useDispatch, useSelector} from 'react-redux'
import {AppState} from '../store/AppState'
import {Div, Subtitle, Title} from '../components'
import {useInterval} from '../hooks'

export default function ReduxClock() {
  // 저장소의 특정 값을 불러올 때
  const today = useSelector<AppState, Date>(state => state.today)
  // 저장소의 데이터를 보내기 위한 객체 생성
  const dispatch = useDispatch()
  useInterval(function () {
    dispatch({type: 'setToday', today: new Date()})
  })

  return (
    <Div className="flex flex-col items-center justify-center mt-16">
      <Title className="mt-4 text-5xl">ReduxClock</Title>
      <Title className="mt-4 text-3xl">{today.toLocaleTimeString()}</Title>
      <Subtitle className="mt-4 text-2xl">{today.toLocaleDateString()}</Subtitle>
    </Div>
  )
}
