import type {SyntheticEvent} from 'react'

// 물리적인 DOM에서 일어나는 native event를 사용하지 않고
// BaseSyntheticEvent를 상속 받은 리액트 전용 이벤트 사용
export default function ReactOnClick() {
  const onClick = function (e: SyntheticEvent) {
    const {isTrusted, target, bubbles} = e
    console.log('3.mouse click occurs on rootDiv', isTrusted, target, bubbles)
  }
  return (
    <div>
      <p>ReactOnClick</p>
      <button onClick={onClick}>Click Me</button>
    </div>
  )
}
