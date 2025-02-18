// addEventListener는 정의한 횟수만큼 실행됨.
document.getElementById('root')?.addEventListener('click', function (e: Event) {
  const {isTrusted, target, bubbles} = e
  console.log('1. mouse click occurs.', isTrusted, target, bubbles)
})
document.getElementById('root')?.addEventListener('click', function (e: Event) {
  const {isTrusted, target, bubbles} = e
  console.log('1. mouse click also occurs.', isTrusted, target, bubbles)
})
export default function EventListener() {
  return <div>EventListener</div>
}
