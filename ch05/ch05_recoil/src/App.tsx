import {RecoilRoot} from 'recoil'
import {useStore} from './store/useStore'
import Counter from './recoil/Counter'

export default function App() {
  const store = useStore()
  return (
    <RecoilRoot>
      <main className="p-8">
        <h1>React Recoil Counter</h1>
        <Counter />
      </main>
    </RecoilRoot>
  )
}
