import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import * as D from './data'
import './index.css'
import App from './App.tsx'

const children = [
  <li key={1}>
    <a href="https://www.google.com" target="blank">
      {/* key를 넣는 이유는 어느 엘레먼트 밑에 중복될 경우 리액트에서는 key로 구분 */}
      <p>Google</p>
    </a>
  </li>,
  <li key={2}>
    <a href="https://www.facebook.com" target="blank">
      <p>Facebook</p>
    </a>
  </li>,
  <li key={3}>
    <a href="https://www.naver.com" target="blank">
      <p>Naver</p>
    </a>
  </li>
]

const children2 = [0, 1, 2].map((n: number) => <h3 key={n}>React {n}</h3>)
const children3 = D.makeArray(10).map((notUsed, index) => (
  <div key={index}>
    <p>{D.randomId()}</p>
    <p>{D.randomId()}</p>
    <p>{D.randomId()}</p>
    <p>{D.randomId()}</p>
    <p>{D.randomId()}</p>
  </div>
))

// 여러개의 배열로 담은 children 변수가 부모컴포넌트 없이 존재가 불가!
// createRoot(document.getElementById('root')!).render({children})

createRoot(document.getElementById('root')!).render(
  <div>{children2}</div>
  // <>
  //   <ul>{children}</ul>
  //   {children2}
  // </>
)
