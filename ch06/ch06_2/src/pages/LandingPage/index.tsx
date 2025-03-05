import {useAtom} from 'jotai'
import * as D from '../../data'
import {imageNameAtom} from '../../jotai/ImageNameAtom'
import ImageBox from './ImageBox'
import {useState, useEffect} from 'react'

export default function Board() {
  const [imageUrlList, setImageUrlList] = useState<string[]>([])
  const [imageName] = useAtom(imageNameAtom)

  // 임의 데이터 생성
  useEffect(() => {
    const newImageList = []
    for (let i = 0; i < 3; i++) {
      newImageList.push(D.randomImage(200, 200))
    }
    setImageUrlList(newImageList)
  }, [])

  return (
    <>
      <ImageBox imageUrlList={imageUrlList} />
      <p>{imageName}</p>
    </>
  )
}
