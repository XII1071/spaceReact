import * as Clock from './clock'
import * as Counter from './counter'
import * as R from './remoteUser'
import * as Cards from './cards'

export type AppState = {
  clock: Clock.state
  counter: Counter.state
  remoteUser: R.state
  cards: Cards.state
}
