const rootDiv = document.createElement('div')
if (rootDiv) {
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
