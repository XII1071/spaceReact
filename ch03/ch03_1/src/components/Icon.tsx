import type {FC, CSSProperties} from 'react'

// 속성 가운데 name은 꼭 필요하지만, style은 없을 수도 있기 때문
// CSSProperties는 복수개를 받기 때문에 필요한 객체
export type IconProps = {
  name: string
  style?: CSSProperties
}

export const Icon: FC<IconProps> = function (props: IconProps) {
  const {name, style} = props
  return <span style={style}>{name}</span>
}
