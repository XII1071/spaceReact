import type {FC} from 'react'

export type ArrowComponentProps = {
  href: string
  text: string
}

const ArrowComponent: FC<ArrowComponentProps> = props => {
  // 속성의 역할 :: 정보전달, 리렌더링
  const {href, text} = props // 구조분해할당
  return (
    <li>
      <a href={href}>
        <p>{text}</p>
      </a>
    </li>
  )
}

export default ArrowComponent
