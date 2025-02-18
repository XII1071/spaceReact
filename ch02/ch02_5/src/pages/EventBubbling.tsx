import type {SyntheticEvent} from 'react'

export default function EventBubbling() {
  const onDivClick = (event: SyntheticEvent) => {
    const {isTrusted, target, bubbles, currentTarget} = event
    console.log('click event bubbles on <div>', isTrusted, target, bubbles, currentTarget)
  }
  const onButtonClick = (event: SyntheticEvent) => {
    const {isTrusted, target, bubbles} = event
    console.log('click event starts at <button>', isTrusted, target, bubbles)
  }
  return (
    <div onClick={onDivClick}>
      <p>EventBubbling</p>
      <button onClick={onButtonClick}>Click Me</button>
    </div>
  )
}
