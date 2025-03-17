import {useState, useEffect} from 'react'
import {useToken} from '../hooks' // 토큰을 가져오는 훅

interface FileData {
  fileName: string
  folderPath: string
  uuid: string
  photosURL: string
  thumbnailURL: string
}

interface UploadResultProps {
  uploadedFiles?: FileData[] // undefined일 수도 있음
}

export function UploadResult({uploadedFiles = []}: UploadResultProps) {
  const token = useToken()
  const [images, setImages] = useState<FileData[]>([])

  useEffect(() => {
    if (uploadedFiles && uploadedFiles.length > 0) {
      setImages(uploadedFiles)
    }
  }, [uploadedFiles])

  // 이미지 삭제 요청 함수
  const handleRemove = async (fileName: string) => {
    const removeUrl = `http://localhost:8080/apiserver/removeFile?fileName=${fileName}`

    try {
      const response = await fetch(removeUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const result = await response.json()

      if (result === true) {
        setImages(prevImages => prevImages.filter(img => img.photosURL !== fileName))
      }
    } catch (error) {
      console.error('Error occurred:', error)
    }
  }

  return (
    <div className="uploadResult">
      {images.length > 0 ? (
        <ul>
          {images.map((file, index) => (
            <li
              key={index}
              data-name={file.fileName}
              data-path={file.folderPath}
              data-uuid={file.uuid}
              data-file={file.photosURL}>
              <div>
                <button
                  className="removeBtn"
                  type="button"
                  onClick={() => handleRemove(file.photosURL)}>
                  X
                </button>
                <img
                  src={`http://localhost:8080/apiserver/display?fileName=${file.thumbnailURL}`}
                  alt="Uploaded"
                />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No uploaded files.</p>
      )}
    </div>
  )
}
