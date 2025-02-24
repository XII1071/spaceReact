import {useEffect, useRef, useState} from 'react'
import Clock from './pages/Clock'
import {useClock} from './hooks'
export default function App() {
  // 1) setInterval 구현, today를 변수를 두어서 갱신을 하는 방식
  // let today = new Date()
  // const id = setInterval(() => {
  //   today = new Date()
  //   // 컴포넌트는 물리적인 돔에 있는것이 아니라 가상돔에 있기 때문에 document 접근 불가
  //   //document.querySelector('#time').innerHTML = today.toISOString()
  // }, 1000)

  // 2) useEffect 훅을 활용, 생성시 한번만 호출
  // let today = new Date()
  // useEffect(() => {
  //   console.log('useEffect called.')
  //   const duration = 1000
  //   const id = setInterval(() => {
  //     today = new Date()
  //     console.log('today', today.toLocaleTimeString())
  //   }, duration)
  //   return () => clearInterval(id) //setInterval 끝나는 시점에 삭제(메모리누수방지)
  // }, []) //의존성 목록은 배열이고 변하는 변수가 없다는 의미로 빈배열 선언

  // 3) useRef 훅을 활용, 메서드 호출
  // let today = useRef(new Date()) //useRef로 메서드 호출을 통해서 today 객체값 갱신
  // useEffect(() => {
  //   console.log('useEffect called.')
  //   const duration = 1000
  //   const id = setInterval(() => {
  //     today.current = new Date() // useRef는 컴포넌트를 다시 렌더링 시키지 않음.
  //     console.log('today', today.current.toLocaleTimeString())
  //   }, duration)
  //   return () => clearInterval(id)
  // }, [])

  // 4) useState 훅을 활용, 상태값을 공유
  // const [today, setToday] = useState(new Date())
  // useEffect(() => {
  //   const duration = 1000
  //   const id = setInterval(() => {
  //     setToday(new Date())
  //   }, duration)
  //   return () => clearInterval(id)
  // }, [])

  // 5) 커스텀 훅을 활용
  const today = useClock()

  // react hook 함수의 특징
  // 1) 같은 리액트 훅을 여러 번 호출할 수 있다.
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)
  useEffect(() => {})
  useEffect(() => {})
  // 2) 함수 몸통이 아닌 몸통 안 복합실행문의 {} 안에 호출불가
  {
    // 지역변수 블록 안에서 리액트 훅 호출 불가
    if (true) {
      const [z, setZ] = useState<number>(0)
    }
  }
  // 3) 비동기 함수를 콜백함수로 사용할 수 없다.
  // useEffect(async() => {await Promise.resolve(1)},[])
  return (
    <main>
      <Clock today={today} />
      <h1 id="time">{x}</h1>
      {/* <h1 id="time">{z}</h1> 에러발생 */}
    </main>
  )
}
