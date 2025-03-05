import {FC, useCallback} from 'react'
export type ImageUrlProps = {
  imageUrlList?: string[]
}

const ImageBox: FC<ImageUrlProps> = ({imageUrlList}) => {
  return (
    <div>
      <h4 className="text-5xl text-center">Photos</h4>
      <div className="flex flex-row justify-center">
        {imageUrlList?.map(url => (
          <img src={url} key={url} />
        ))}
      </div>
    </div>
  )
}
export default ImageBox
