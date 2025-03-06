import {useAtom} from 'jotai'
import * as D from '../../data'
import ImageBox from './ImageBox'
import {imageNameAtom} from '../../jotai/imageNameAtom'
import {useCallback, useEffect, useState} from 'react'

export default function LandingPage() {
  // const imageUrlList: string[] = []
  const [imageUrlList, setImageUrlList] = useState<string[]>([])
  const [imageName] = useAtom(imageNameAtom)

  const loadChange = useCallback(() => {
    // 임의 데이터 생성
    for (let i = 0; i < 3; i++) {
      imageUrlList.push(D.randomImage(200, 200))
    }
    const newImages = Array.from({length: 3}, () => D.randomImage(200, 200))
    setImageUrlList(newImages)
  }, [])

  useEffect(() => {
    loadChange()
  }, [])

  return (
    <>
      <ImageBox imageUrlList={imageUrlList} />
      <p>{imageName}</p>
    </>
  )
}
