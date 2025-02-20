/*
// ?: 선택적 프로퍼티 지정(속성이 있어도 되고 없어도 된다.)
type User + { name: string; age?: number;}
const user1: User = {name:"홍길동", age:25}
const user1: User = {name:"짱구"}
*/

/*
import type {FC, ReactNode} from 'react'

export type PProps = {children?: ReactNode}
const P: FC<PProps> = props => {
  const {children} = props
  return <p children={children} />
}
export default P
*/

// 리액트 18버전부터 FC에서 children 제거하고 PropsWithChildren 사용
// Props타입을 반복해서 여러 children속성을 추가할 때 사용
import type {FC, PropsWithChildren} from 'react'

export type PProps = {}
const P: FC<PropsWithChildren<PProps>> = function (props) {
  return <p {...props} />
}
export default P
