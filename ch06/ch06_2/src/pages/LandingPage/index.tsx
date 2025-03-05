import * as D from '../../data'
import ImageBox from './ImageBox'

export default function Board() {
  const imageUrlList: string[] = []

  // 임의 데이터 생성
  for (let i = 0; i < 3; i++) {
    imageUrlList.push(D.randomImage(200, 200))
    // imageList.push(new BoardDTO(i + 1, 'title' + i, 'content' + i))
  }

  return (
    <>
      <ImageBox imageUrlList={imageUrlList} />
      <p></p>
    </>
  )
}
