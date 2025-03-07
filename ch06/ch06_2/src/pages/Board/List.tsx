import {FC, useCallback} from 'react'
import {BoardDTO} from '../../dto/BoardDTO'
import {useLocation, useNavigate} from 'react-router-dom'

export type BoardListProps = {
  boardList?: BoardDTO[]
}

const List: FC<BoardListProps> = ({boardList}) => {
  const navigate = useNavigate() // 1) react-router-dom에서 제공하는 훅함수
  const location = useLocation() // 2) react-router-dom에서 제공하는 훅함수
  // console.log(boardList)
  const goRead = useCallback(
    (bid: number) => () => {
      // location.href = "/board/read/" + bid
      navigate(`/board/read/${bid}`)
      // location은 window.location과 일치하지 않지만, 위치에 대한 정보를 담고 있음.
      console.log(location.pathname + '/read/' + bid)
      console.log(location)
    },
    [navigate]
  )
  const regClicked = useCallback(() => {
    navigate(`/board/register`)
  }, [navigate])

  return (
    <div>
      <h4>Board</h4>
      <button className="btn btn-accent" onClick={regClicked}>
        Register
      </button>
      <table className="table table-striped w-150">
        <thead>
          <tr>
            <th>No.</th>
            <th>Title</th>
            <th>Content</th>
          </tr>
        </thead>
        <tbody>
          {boardList?.map(board => (
            <tr key={board.bid} onClick={goRead(board.bid)} style={{cursor: 'pointer'}}>
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
export default List
