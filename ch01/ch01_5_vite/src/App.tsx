// import {useState} from 'react'
import './App.css'
import * as D from './data'

function App() {
  // const [count, setCount] = useState(0)
  // console.log('App called')
  // return <h1>Hello React</h1>
  return (
    <div>
      <p>
        {D.randomName()}, {D.randomJobTitle()}, {D.randomDayMonthYear()},
      </p>
      <img src={D.randomAvatar()} height="50" />
      <img src={D.randomImage()} height="300" />
    </div>
  )
}
// HMR : Hot Module Replace 즉각 업뎃, 핫리로드 동일
export default App
