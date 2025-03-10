import {useRef, useState} from 'react'

export function Login() {
  const usernameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState({username: '', password: ''})
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const username = usernameRef.current?.value.trim() || ''
    const password = passwordRef.current?.value.trim() || ''
    let isValid = true
    let newError = {username: '', password: ''}

    if (!username) {
      newError.username = '아이디를 입력하세요.'
      isValid = false
    }

    if (!password) {
      newError.password = '비밀번호를 입력하세요.'
      isValid = false
    } else if (password.length < 6) {
      newError.password = '비밀번호는 최소 6자 이상이어야 합니다.'
      isValid = false
    }

    setError(newError)
    return isValid
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    setTimeout(() => {
      alert(`로그인 성공: ${usernameRef.current?.value}`)
      setLoading(false)
    }, 1000)
  }

  return (
    <section className="mt-10 flex flex-col items-center">
      <h2 className="font-bold text-4xl text-center text-gray-800">Login</h2>
      <div className="mt-6 w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 아이디 입력 */}
          <div>
            <label htmlFor="username" className="block text-gray-700 font-semibold">
              Username
            </label>
            <input
              type="text"
              id="username"
              ref={usernameRef}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:ring focus:ring-blue-300"
              placeholder="Enter your username"
            />
            {error.username && <p className="text-red-500 text-sm">{error.username}</p>}
          </div>

          {/* 비밀번호 입력 */}
          <div>
            <label htmlFor="password" className="block text-gray-700 font-semibold">
              Password
            </label>
            <input
              type="password"
              id="password"
              ref={passwordRef}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:ring focus:ring-blue-300"
              placeholder="Enter your password"
            />
            {error.password && <p className="text-red-500 text-sm">{error.password}</p>}
          </div>

          {/* 로그인 유지 체크박스 */}
          <div className="flex items-center">
            <input type="checkbox" id="remember-me" className="mr-2" />
            <label htmlFor="remember-me" className="text-gray-600 text-sm">
              Remember me
            </label>
          </div>

          {/* 로그인 버튼 */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            disabled={loading}>
            {loading ? '로그인 중...' : 'Sign in'}
          </button>
        </form>
      </div>
    </section>
  )
}
