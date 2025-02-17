import {Component, ReactNode, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// 사용자 컴포넌트 중 함수형 컴포넌트
// export default function App() {

// }

// 사용자 컴포넌트 중 클래스스 컴포넌트
export default class App2 extends Component {
  render() {
    return (
      <ul>
        <li>
          <a href="https://www.meta.com">
            <p>Meta</p>
          </a>
        </li>
      </ul>
    )
  }
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount(count => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  )
}

export default App
