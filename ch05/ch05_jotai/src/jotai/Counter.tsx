import {useAtom} from 'jotai'
import {countAtom} from './counterAtom'
import './stylecounter.css'

function Counter() {
  const styles = {
    container: {padding: '20px'},
    count: {
      backgroundColor: 'black',
      fontSize: '24px',
      fontWeight: 'bold',
      color: 'white'
    },
    button: {fontSize: '18px', margin: '5px', padding: '10px 20px'}
  }

  const [count, setCount] = useAtom(countAtom)

  return (
    <div className="containers">
      <h2>Jotai Counter</h2>
      <p style={styles.count}>{count}</p>
      <div>
        <button style={styles.button} onClick={() => setCount(count + 1)}>
          +
        </button>
        <button style={styles.button} onClick={() => setCount(count - 1)}>
          -
        </button>
      </div>
    </div>
  )
}

export default Counter
