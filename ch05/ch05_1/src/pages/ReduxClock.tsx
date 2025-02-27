import {useSelector} from 'react-redux'
import {AppState} from '../store/AppState'
import {Div, Subtitle, Title} from '../components'

export default function ReduxClock() {
  const today = useSelector<AppState, Date>(state => state.today)

  return (
    <Div className="flex flex-col items-center justify-center mt-16">
      <Title className="mt-4 text-5xl">ReduxClock</Title>
      <Title className="mt-4 text-3xl">{today.toLocaleTimeString()}</Title>
      <Subtitle className="mt-4 text-2xl">{today.toLocaleDateString()}</Subtitle>
    </Div>
  )
}
