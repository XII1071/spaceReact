import {BoardDTO} from '../../dto/BoardDTO'
import List from './List'

export default function Board() {
  const boardList: BoardDTO[] = []

  // 임의 데이터 생성
  for (let i = 0; i < 10; i++) {
    boardList.push(new BoardDTO(i + 1, 'title' + i, 'content' + i))
  }

  return <List boardList={boardList} />
}
