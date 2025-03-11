import type {ChangeEvent, FormEvent} from 'react'
import {useState, useCallback, useRef} from 'react'
import {Link, useNavigate} from 'react-router-dom'

type LoginFormType = Record<'email' | 'pass', string>
const initialFormState = {email: '', pass: ''}
export function Login() {
  const [{email, pass}, setForm] = useState<LoginFormType>(initialFormState)
  const changed = useCallback(
    (key: string) => (e: ChangeEvent<HTMLInputElement>) => {
      setForm(obj => ({...obj, [key]: e.target.value}))
    },
    []
  )
  const navigate = useNavigate()

  const emailRef = useRef<HTMLInputElement>(null)
  const passRef = useRef<HTMLInputElement>(null)
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (emailRef.current?.value === '') {
      if (emailRef.current !== null) {
        emailRef.current.setAttribute('placeholder', 'Please Check Email')
        emailRef.current.focus()
      }
      return
    }
    if (passRef.current?.value === '') {
      if (passRef.current !== null) {
        passRef.current.setAttribute('placeholder', 'Please Check Password')
        passRef.current.focus()
      }
      return
    }
    getSession(email, pass)
  }
  const getSession = async (email: string, pass: string) => {
    try {
      new Promise((resolve, reject) => {
        // prettier ignore
        fetch(
          'http://localhost:8080/apiserver/auth/login?email=' +
            email +
            '&password=' +
            pass,
          {
            method: 'POST'
          }
        )
          .then(res => res.text())
          .then(token => {
            if (token.startsWith('{"code"')) {
              navigate('/login')
            } else {
              sessionStorage.setItem('token', token)
              sessionStorage.setItem('email', email)
              navigate('/list')
            }
          })
          .catch(err => console.log('Error:', err))
      })
    } catch (error) {
    } finally {
    }
  }

  return (
    <div
      className="flex items-center justify-center"
      style={{height: '100vh', minHeight: '100vh'}}>
      <div className="flex flex-col rounded items-center bg-gray-200 justify-center flex-1 max-w-sm mx-auto">
        <div className="w-full px-6 py-8 text-black rounded shadow-md">
          <form method="post" onSubmit={onSubmit}>
            <h1 className="mb-8 text-4xl text-center">My Journal</h1>
            <input
              type="text"
              name="email"
              ref={emailRef}
              className="input input-accent w-full p-1 mb-4 text-xl rounded-lg size-15"
              placeholder="Email"
              onChange={changed('email')}
            />
            <input
              type="password"
              name="pass"
              ref={passRef}
              className="input input-accent w-full p-1 mb-4 text-xl rounded-lg size-15"
              placeholder="Password"
              onChange={changed('pass')}
            />
            <button
              className="w-full p-3 mb-4 text-2xl text-black bg-gray-300 rounded size-15"
              type="submit">
              Login
            </button>
          </form>
          <span className="mt-6 text-lg text-grey-dark font-sans md:font-serif">
            Create account?
            <Link className="ml-5 text-lg" to="/join">
              Join
            </Link>
          </span>
        </div>
      </div>
    </div>
  )
}
