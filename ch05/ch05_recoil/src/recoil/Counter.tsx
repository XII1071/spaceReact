import {useRecoilState} from 'recoil'
import {countState} from './atoms'

function Counter() {
  const [count, setCount] = useRecoilState(countState)
  return (
    <div>
      <h2>Recoil Counter</h2>
      <p>{count}</p>
      <div>
        <button className="btn btn-secondary" onClick={() => setCount(count + 1)}>
          +
        </button>
        <button className="btn btn-warning" onClick={() => setCount(count - 1)}>
          -
        </button>
      </div>
    </div>
  )
}

export default Counter
