import UseOrCreateTest from './pages/UseOrCreateTest'
import Memo from './pages/Memo'
import Callback from './pages/Callback'
import HighOrderCallback from './pages/HighOrderCallback'

export default function App() {
  return (
    <main>
      <h1 className="bg-blue-500 text-5xl text-center p-3">useMemo, useCallback</h1>
      <div className="mockup-window border-base-300 border">
        <div className="border-base-300 flex justify-left border-t px-4 py-16">
          <ol>
            <li>
              리액트 훅은 함수입니다. 함수안에서 선언한 변수는 그 유효 범위가 함수
              안입니다. 따라서 함수 범위를 벗어난 변수는 소멸됩니다.
            </li>
            <li>
              소멸되지 않게 상태값을 가지게 되는데 상태(State)는 변수의 유효범위와
              무관하게 계속 유지하는 값을 의미한다.
            </li>
            <li>
              그런데 함수컴포넌트는 '함수'이므로 블록 범위라는 개념 때문에 상태를 가질 수
              없다. 함수 범위밖에 변수를 선언하게 되면 소멸되지 않고 계속 유지될 수 있다.
              {/* 
              const global = 1 // 전역변수
              export default function UseOrCreate() {
                return <p>{globla}</p>
              } 
              */}
            </li>
            <li>캐시를 사용해서 전역변수를 구현할 수 있다.</li>
          </ol>
        </div>
      </div>
      <HighOrderCallback />
      <Callback />
      <Memo />
      <UseOrCreateTest />
    </main>
  )
}
