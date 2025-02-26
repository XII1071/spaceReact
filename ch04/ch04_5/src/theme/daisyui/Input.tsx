import type {FC, DetailedHTMLProps, InputHTMLAttributes} from 'react'
import {forwardRef} from 'react'

// prettier-ignore
export type ReactInputProps = 
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>,HTMLInputElement>

export type InputProps = ReactInputProps & {}

// prettier-ignore
// export const Input = forwardRef<HTMLInputElement, InputProps>(
//   // 사용자 컴포넌트의 ref속성을 사용하려면 forwardRef를 사용해야 한다.
//   function (props, ref) {
//     const {className: _className, ...inputProps} = props
//     const className = ['input', _className].join(' ')
//     return <input ref={ref} {...inputProps} className={className} />
//   }
// )

// react 19버전에서는 아래도 된다.
export const Input: FC<InputProps> = ({className:_className,...InputProps}) => {
  const className=['input', _className].join(" ") 
  return <input {...InputProps} className={className} />
}
