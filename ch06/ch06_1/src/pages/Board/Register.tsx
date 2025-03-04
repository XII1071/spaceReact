import {FormEvent, useCallback, useRef} from 'react'
import {useParams, useSearchParams} from 'react-router-dom'

export default function Register() {
  const idRef = useRef<HTMLInputElement | null>(null)
  const passRef = useRef<HTMLInputElement | null>(null)
  const params = useParams()
  const [search] = useSearchParams()

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
          ID: <input type="text" name="id" id="id" ref={idRef} />
          Pass: <input type="password" name="pass" id="pass" ref={passRef} />
          <button onClick={register}>등록</button>
        </form>
        <p>id: {params['id']}</p>
        <p>pass: {params['pass']}</p>
        <p>id: {search.get('id')}</p>
        <p>pass: {search.get('pass')}</p>
      </div>
    </div>
  )
}
