import type {FC, DetailedHTMLProps, InputHTMLAttributes} from 'react'

export type ReactInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

export type inputProps = ReactInputProps & {}

export const Input: FC<inputProps> = ({
  className: _className,
  type: _type,
  ...inputProps
}) => {
  let className = ''
  const type = _type
  if (type == 'text' || type == 'password') {
    className = ['input', _className].join(' ')
    return <input {...inputProps} type={type} className={className} />
  } else {
    return <input {...inputProps} type={type} />
  }
}
