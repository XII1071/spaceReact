import {RecoilRoot} from 'recoil'
import Counter from './recoil/Counter'

export default function App() {
  return (
    <RecoilRoot>
      <main className="p-8">
        <h1>React Recoil Counter</h1>
        <Counter />
      </main>
    </RecoilRoot>
  )
}
