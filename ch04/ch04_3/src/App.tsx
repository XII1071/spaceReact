import NumberState from './pages/NumberState'
import InputTest from './pages/InputTest'
import ShowHideModal from './pages/ShowHideModal'
import RadioInputTest from './pages/RadioInputTest'
import HigherOrderRadioInputTest from './pages/HigherOrderRadioInputTest'
import BasicForm from './pages/BasicForm'
import ObjectState from './pages/ObjectState'
import ArrayState from './pages/ArrayState'

function App() {
  return (
    <main>
      <h1 className="bg-blue-500 text-5xl text-white  text-center p-3">
        상태 변화를 탐지하는 useState 훅
      </h1>
      <ArrayState />
      <ObjectState />
      <BasicForm />
      <HigherOrderRadioInputTest />
      <RadioInputTest />
      <ShowHideModal />
      <InputTest />
      <NumberState />
    </main>
  )
}

export default App
