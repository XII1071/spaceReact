// 리액트에서는 전역변수를 사용하여 캐쉬를 구현할 수 있지만
// 특별히 내부에서 관리되는 캐시는 어떤 상황이 일어나도 값을 갱신을 해줘야 함.
// 리액트 훅에서는 캐시를 갱신하게 하는 요소를 의존성이라고 한다.
// 의존성 목록 중 어느 하나라도 조건이 충족되면 캐시된 값을 자동으로 갱신하고
// 해당 컴포넌트를 다시 렌더링 하여 변경사항을 반영해줌.
// Memoization 과거의 값을 반복해서 사용함으로 전체 계산속도를 높이는 코드 최적화 기법.
// 의존성목록이 []처럼 비어 있는 경우는 한번만 호출해서 사용할 경우에 해당.
// 한번만 호출해도 충분하기 때문에 의존성 목록은 전혀 없음을 의미하는 []를 사용

import {useMemo} from 'react'
import {Avatar, Title} from '../components'
import * as D from '../data'

export default function Memo() {
  const headTexts = useMemo<string[]>(function () {
    return ['NO.', 'Name', 'Job Title', 'Email Address']
  }, [])

  const users = useMemo<D.IUser[]>(function () {
    return D.makeArray(10).map(D.makeRandomUser)
  }, [])

  const head = useMemo(
    () => headTexts.map(text => <th key={text}>{text}</th>),
    [headTexts]
  )
  const body = useMemo(
    () =>
      users.map((user, index) => (
        <tr key={user.uuid}>
          <th>{index + 1}</th>
          <td className="flex items-center">
            <Avatar src={user.avatar} size="1.5rem" />
            <p className="ml-2">{user.name}</p>
          </td>
          <td>{user.jobTitle}</td>
          <td>{user.email}</td>
        </tr>
      )),
    [users]
  )
  return (
    <div className="mt-4">
      <Title>useMemo 훅을 활용하여 데이터를 캐시하는 기능 구현</Title>
      <div className="overflow-x-auto mt-4 p-4">
        <table className="table table-zebra table-compact w-full">
          <thead>
            <tr>{head}</tr>
          </thead>
          <tbody>{body}</tbody>
        </table>
      </div>
    </div>
  )
}
