const rootDiv = document.getElementById('root')
if (rootDiv) {
  // onclick이 복수일 경우 가장 마지막 정의만 실행
  rootDiv.onclick = function (e: Event) {
    const {isTrusted, target, bubbles} = e
    console.log('2. mouse click occurs on rootDiv.', isTrusted, target, bubbles)
  }
  rootDiv.onclick = function (e: Event) {
    const {isTrusted, target, bubbles} = e
    console.log('2. mouse click also occurs on rootDiv.', isTrusted, target, bubbles)
  }
}

export default function OnClick() {
  return <div>OnClick</div>
}
