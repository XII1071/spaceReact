import {useEffect, useRef, useState} from 'react'
import Clock from './pages/Clock'
import {useClock} from './hooks/useClock'
export default function App() {
  // // 1.) setInterval 구현, today 변수를 두어서 갱신을 하는 방식
  // let today = new Date()
  // const id = setInterval(() => {
  //   today = new Date()
  //   // 컴포넌트는 물리적인 돔에 있는것이 아니라 가상돔에 있기 때문에 접근불가
  //   document.querySelector('#time').innerHTML = today.toISOString()
  // }, 1000)

  // // 2) useEffect, useLayoutEffect 리액트 훅을 활용, 생성시 한번만 호출
  // let today = new Date()
  // useEffect(() => {
  //   console.log('useEffect called.')
  //   const duration = 1000
  //   const id = setInterval(() => {
  //     today = new Date()
  //     console.log('today', today.toLocaleTimeString())
  //   }, duration)
  //   return () => clearInterval(id) //setInterval 끝나는 시점에 삭제 (메모리누수방지)
  // }, []) // 의존성 목록은 배열이고 변하는 변수가 없다는 의미로 빈배열 선언

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

  return (
    <main>
      <Clock today={today} />
      <h1 id="time"></h1>
    </main>
  )
}
