import {FormEvent, useCallback, useRef} from 'react'
import {useSearchParams} from 'react-router-dom'

export default function Register() {
  const idRef = useRef<HTMLInputElement | null>(null)
  const passRef = useRef<HTMLInputElement | null>(null)
  const [search] = useSearchParams() //복수개가 넘어오기에 배열

  const register = useCallback(
    () => (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (idRef.current?.value) {
        idRef.current.focus()
        return
      }
      if (passRef.current?.value) {
        passRef.current.focus()
        return
      }
    },
    []
  )
  return (
    <div>
      <h4>Register</h4>
      <div>
        <form action="/board/register" method="get">
          ID: <input type="text" name="id" id="id" ref={idRef} className="input" /> <br />
          Pass:
          <input type="password" name="pass" id="pass" ref={passRef} className="input" />
          <br />
          <button className="btn btn-dash" onClick={register}>
            등록
          </button>
        </form>
        <p>
          useSearchParams: 쿼리 스트링 파라미터를 가져올 때 사용
          (예:/search?id=admin&pass=1).
        </p>
        <p>id: {search.get('id')}</p>
        <p>pass: {search.get('pass')}</p>
      </div>
    </div>
  )
}
