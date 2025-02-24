import {useCallback, useMemo} from 'react'
import {Title} from '../components'
import * as D from '../data'
import {Button} from '../theme/daisyui'

export default function HighOrderCallback() {
  // 1) 이벤트에 정보를 전달할 수 없다.
  // const onClick = useCallback(() => alert(`button clicked`), [])

  // 2) onClick에 '() => void'타입의 콜백함수를 설정해야 하므로 name변수 전달 불가.
  // const onClick = useCallback(() => alert(`${name} button clicked!`), [])

  // 3) 고차함수를 사용하면 콜백함수에 어떤 정보를 추가로 전달 가능
  //const onClick = useCallback((name: string) => function(){}, [])
  const onClick = useCallback(function (name: string) {
    // return 할 때 useCallback의 콜백함수 형태인 '() => void'타입을 만족한다.
    return function () {
      return alert(`${name} clicked!`)
    }
  }, [])

  const buttons = useMemo(
    () =>
      D.makeArray(3)
        .map(D.randomName)
        .map((name, index) => (
          <Button
            key={index}
            onClick={onClick(name)}
            className="btn-primary btn-wide btn-xs">
            {name}
          </Button>
        )),
    [onClick]
  )
  return (
    <div>
      <Title>고차함수(HighOrderCallback) 이용하여 필요한 값을 전달한다.</Title>
      <div className="flex justify-evenly mt-4">{buttons}</div>
    </div>
  )
}
