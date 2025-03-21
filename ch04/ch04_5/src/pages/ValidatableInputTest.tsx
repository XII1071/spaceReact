import {useRef, useCallback} from 'react'
import {Title} from '../components'
import {ValidatableInput} from '../theme/daisyui'
import type {ValidatableInputMethods} from '../theme/daisyui'

export default function ValidatableInputTest() {
  const methodsRef = useRef<ValidatableInputMethods>(null)
  const validateEmail = useCallback(() => {
    if (methodsRef.current) {
      const [valid, valuOrErrorMessage] = methodsRef.current.validate()
      if (valid) alert(`${valuOrErrorMessage}는 유효한 이메일 주소입니다.`)
      else alert(valuOrErrorMessage)
    }
  }, [])

  // prettier-ignore
  return (
    <section className="mt-4">
      <Title>ValidatableInputTest</Title>
      <div className="flex justify-center mt-4 ">
        <div className="flex flex-col w-1/3 p-2">
          <ValidatableInput type="email" ref={methodsRef} className="input-primary" />
          <button onClick={validateEmail} className="mt-4 btn btn-primary">
            validate
          </button>
        </div>
      </div>
    </section>
  )
}
