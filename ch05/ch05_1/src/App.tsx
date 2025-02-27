import ResponsiveContextTest from './pages/ResponsiveContextTest'
import {ResponsiveProvider} from './contexts'

export default function App() {
  return (
    // 모든 컨텍스트 제공자는 가장 최상위 컴포넌트로 동작해야 한다는 원칙!
    <ResponsiveProvider>
      <main>
        <ResponsiveContextTest />
      </main>
    </ResponsiveProvider>
  )
}
