import type {FC, DetailedHTMLProps, HTMLAttributes} from 'react'

// recat 프레임워크에서 한꺼번에 특정 HTML 요소의 모든 속성들은 추가할 수 있는 객체
type ReactSpanProps = DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>

// & 기호는 교집합, | 기호는 합집합
export type IconProps3 = ReactSpanProps & {name: string}

export const Icon3: FC<IconProps3> = function (iconProps3: IconProps3) {
  const {name, className: _calssName, ...props} = iconProps3
  const className = 'material-symbols-outlined'
  return (
    <span className={className} {...props}>
      {name}
    </span>
  )
}
