import {useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {Component} from 'react'
import './App.css'
import ClassComponent from './ClassComponent'
import ArrowComponent from './ArrowComponent'

// 사용자 컴포넌트 중 클래스 컴포넌트
// export default class App extends Component {
//   render() {
//     const isLoading = false
//     if (isLoading) return <p>Loading.......</p>

//     return (
//       <>
//         <span>속성이 없는 방식</span>
//         <ul style={{background: 'yellow'}}>
//           {/* <ClassComponent />
//           <ClassComponent /> */}
//         </ul>
//         <span>속성이 있는 방식</span>
//         <ul style={{background: 'black', color: 'white'}}>
//           {
//             /* prettier-ignore */
//             !isLoading ? (<p>Loading...</p>) : (
//             <ClassComponent href="https://www.naver.com" text="Naver" />
//           )
//           }
//           {!isLoading && <ClassComponent href="https://www.naver.com" text="Naver" />}
//         </ul>
//       </>
//     )
//   }
// }

// 사용자 컴포넌트 중 함수형 컴포넌트 :: 합쳐 놓은 형태
// export default function App() {
//   return <div>사용자 컴포넌트 중 함수형 컴포넌트</div>
// }

// 사용자 컴포넌트 중 함수형 컴포넌트를 화살표 함수로 변형
// const App = () => {
//   return <div>사용자 컴포넌트 중 함수형 컴포넌트</div>
// }
// export default App

// 사용자 컴포넌트 중 함수형 컴포넌트 :: 함수와 export를 분리한 형태
export default function App() {
  return (
    <ul>
      <ClassComponent href="https://www.naver.com" text="Naver" />
      <ArrowComponent href="https://www.meta.com" text="Meta" />
    </ul>
  )
}
