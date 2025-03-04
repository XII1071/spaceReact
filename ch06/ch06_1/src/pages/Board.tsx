import {useCallback} from 'react'
import {BoardDTO} from '../dto/BoardDTO'
import {useNavigate} from 'react-router-dom'

export default function Board() {
  const navigate = useNavigate()
  const boardList: BoardDTO[] = []
  for (let i = 0; i < 10; i++) {
    boardList.push(new BoardDTO(i + 1, 'title' + i, 'content' + i))
  }
  // console.log(boardList)
  const goRead = useCallback(
    (bid: number) => () => {
      // location.href = './board/list/' + bid
      navigate('/board/list/${bid}')
    },
    [navigate]
  )

  return (
    <div>
      <h4>Board</h4>
      <table className="table table-striped w-150">
        <thead>
          <tr>
            <th>No.</th>
            <th>Title</th>
            <th>Content</th>
          </tr>
        </thead>
        <tbody>
          {boardList.map(board => (
            <tr
              key={board.bid}
              className=""
              onClick={goRead(board.bid)}
              style={{cursor: 'pointer'}}>
              <td>{board.bid}</td>
              <td>{board.title}</td>
              <td>{board.content}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
