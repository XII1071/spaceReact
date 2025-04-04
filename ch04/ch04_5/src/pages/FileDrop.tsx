import {Title, Div} from '../components'
import {ChangeEvent, DragEvent} from 'react'
import {useState, useRef, useCallback, useMemo} from 'react'
import {useToggle} from '../hooks'
import {imageFileReaderP} from '../utils'

export default function FileDrop() {
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [error, setError] = useState<Error | null>(null)
  const [loading, toggleLoading] = useToggle(false)

  // ref 속성은 물리 DOM객체의 참조할 때 사용, 모든 리액트 컴포넌트의 속성
  const inputRef = useRef<HTMLInputElement>(null)
  const onDivClick = useCallback(() => inputRef.current?.click(), [])

  // image 변환을 위한 함수 선언
  const makeImageUrls = useCallback(
    (files: File[]) => {
      //Array.from은 File[]을 일반 배열로 변경하고 후에 string[]로 변환
      const promises = Array.from(files).map(imageFileReaderP)

      toggleLoading()
      Promise.all(promises)
        .then(urls => setImageUrls(imageUrls => [...urls, ...imageUrls]))
        .catch(setError)
        .finally(toggleLoading)
    },
    [toggleLoading]
  )

  // input:file의 변화를 감지하기 위한 함수
  const onInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setError(null)
      const files = e.target.files //FileList타입(유사배열객체)을 리턴
      // Array.from은 FileList를 File[]로 변환
      files && makeImageUrls(Array.from(files))
    },
    [makeImageUrls]
  )

  const onDivDragOver = useCallback((e: DragEvent) => e.preventDefault(), [])
  const onDivDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault()
      setError(null)
      const files = e.dataTransfer?.files
      files && makeImageUrls(Array.from(files))
    },
    [makeImageUrls]
  )

  const images = useMemo(
    () =>
      imageUrls.map((url, index) => (
        <Div
          key={index}
          src={url}
          className="m-2 bg-transparent bg-center bg-no-repeat bg-contain"
          // width="5rem"
          // height="5rem"
          width="100vw"
          height="100vh"
        />
      )),
    [imageUrls]
  )

  // prettier-ignore
  return (
    <section className="mt-4">
      <Title>FileDrop</Title>
      {error && (
        <div className="p-4 mt-4 bg-red-200">
          <p className="text-3xl text-red-500 text-bold">{error.message}</p>
        </div>
      )}

      <div onClick={onDivClick}
        className="w-full mt-4 bg-gray-200 border border-gray-500">
        {loading && (
          <div className="flex items-center justify-center">
            <button className="btn btn-circle loading"></button>
          </div>
        )}

        <div onDragOver={onDivDragOver} onDrop={onDivDrop}
          className="flex flex-col items-center justify-center h-40 cursor-pointer">
          <p className="text-3xl font-bold">drop images or click me</p>
        </div>
        <input ref={inputRef} onChange={onInputChange}
          multiple className="hidden" type="file" accept="image/*"/>
      </div>

      <div className="flex flex-wrap justify-center">{images}</div>
    </section>
  )
}
