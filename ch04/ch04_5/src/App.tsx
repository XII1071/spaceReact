import ClickTest from './pages/ClickTest'
import FileDrop from './pages/FileDrop'
import InputFocusTest from './pages/InputFocusTest'
import InputValueTest from './pages/InputValueTest'
import ForwardRefTest from './pages/ForwardRefTest'
import ValidatableInputTest from './pages/ValidatableInputTest'

export default function App() {
  return (
    <main>
      <h1 className="bg-blue-500 text-white text-5xl text-center p-3">
        ref라는 속성에 적용하는 값을 만들어 주는 훅 useRef, useImperativeHandle.
        <br />
        ref 속성은 초기에는 null이었다가 마운트되는 시점에서 물리DOM객체의 값이 된다.
        <br />즉 ref는 물리 DOM 객체의 참조이다.
      </h1>
      <ValidatableInputTest />
      <ForwardRefTest />
      <InputValueTest />
      <InputFocusTest />
      <FileDrop />
      <ClickTest />
    </main>
  )
}
