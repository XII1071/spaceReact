import type {FC, CSSProperties} from 'react'

// 속성 가운데 name은 꼭 필요하지만, style은 없을 수도 있기 때문
export type IconProps2 = {
  name: string
  className?: string
  style?: CSSProperties
}
// ... 전개 연산자, 잔여 연산자, data-set 같은 경우 처리 가능
export const Icon2: FC<IconProps2> = function ({name, className, ...props}) {
  return (
    <span className={className} {...props}>
      {name}
    </span>
  )
}
