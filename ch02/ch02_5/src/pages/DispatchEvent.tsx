export default function DispatchEvent() {
  const onCallDispatchEvent = function () {
    console.log('onCallDispatchEvent')
    // event가 사용자의 프로그래밍에 의해서 발생 isTrusted가 false
    document.getElementById('root')?.dispatchEvent(new Event('click', {bubbles: false}))
  }
  const onCallClick = function () {
    console.log('onCallClick')
    // ?. 존재할 경우에만 접근
    document.getElementById('root')?.click()
  }

  return (
    <div>
      <p>DispatchEvent</p>
      <button onClick={onCallDispatchEvent}>call dispatchEvent</button>
      <button onClick={onCallClick}>call click</button>
    </div>
  )
}
