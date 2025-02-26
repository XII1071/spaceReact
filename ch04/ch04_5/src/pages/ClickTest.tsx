import {Title} from '../components'
import {useRef, useCallback} from 'react'

export default function ClickTest() {
  const inputRef = useRef<HTMLInputElement>(null)

  const onClick = useCallback(() => inputRef.current?.click(), [])
  // ?. :: Optional chaining, inputRef.current 가 존재하면 click()을 실행
  // 존재 안하면 undefined를 반환
  // current 속성은 그 값이 변하여도 리렌더링에 미포함되도록 설계 :: 의존성목록에 불포함할것!

  // const onClick = useCallback(function() {
  //   if(!inputRef.current) return undefined
  //   inputRef.current.click();
  // }, [])

  return (
    <section className="mt-4">
      <Title>ClickTest</Title>
      <div className="flex items-center justify-center mt-4">
        <button className="mr-4 btn btn-primary" onClick={onClick}>
          Click Me
        </button>
        <input className="hidden" type="file" accept="image/*" ref={inputRef} />
      </div>
    </section>
  )
}
