import {
  ChangeEvent,
  FormEvent,
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import {useNavigate, useSearchParams} from 'react-router-dom'
import defaultImg from '../../assets/no-img.gif'
import {useToken} from '../../hooks'
import {Title} from '../../components'

interface MembersDTO {
  mid: number
  name: string
  nickname: string
  email: string
  mobile: string
}

interface JournalDTO {
  jno: number
  title: string
  content: string
  photosDTOList: {path: string}[]
  commentsCnt: number
  membersDTO: MembersDTO
  likes: number
  regDate: string
  modDate: string
}
interface PageRequestDTO {
  page: string
  size: string
  type: string
  keyword: string
}

interface PhotosDTO {
  uuid: string | Blob
  photosName: string | Blob
  path: string | Blob
}

export function Modify() {
  const token = useToken()
  const navigate = useNavigate()
  const [journalDTO, setJournalDTO] = useState<JournalDTO | null>(null)
  const refFile = useRef<HTMLInputElement | null>(null)
  const refTitle = useRef<HTMLInputElement | null>(null)
  const refContent = useRef<HTMLInputElement | null>(null)

  const [inputHiddens, setInputHiddens] = useState('')

  // 주소의 쿼리를 받기 위한 선언
  const [query] = useSearchParams()
  let compare = query.get('page') // 기본적으로 페이지 1을 사용
  const page = compare === 'null' || compare == null ? '1' : compare
  compare = query.get('type')
  const type = compare === 'null' || compare == null ? '' : compare
  compare = query.get('keyword')
  const keyword = compare === 'null' || compare == null ? '' : compare
  compare = query.get('jno')
  const jno = compare === 'null' || compare == null ? '' : compare

  const transform = (str: string) => {
    return str.replace(/\n/g, '')
  }

  const checkExtension = useCallback((fileName: string, fileSize: number) => {
    const maxSize = 1024 * 1024 * 10
    if (fileSize >= maxSize) {
      alert('파일사이즈 초과')
      return false
    }
    //const regex = new RegExp("(.*?)\.(exe|sh|zip|alz|tiff)$"); //i대소문자구분X
    const regex = new RegExp('(.*?).(jpg|jpeg|png|gif|bmp|pdf)$', 'i')
    if (!regex.test(fileName)) {
      alert('해당파일 업로드 금지!')
      return false
    }
    return true
  }, [])

  function showResult(arr: []) {
    const uploadUL = document.querySelector('.uploadResult ul')
    let str = ''
    const url = 'http://localhost:8080/apiserver/display'
    for (let i = 0; i < arr.length; i++) {
      str += `<li data-name='${arr[i].fileName}' data-path='${arr[i].folderPath}'
      data-uuid='${arr[i].uuid}' data-file='${arr[i].imagesURL}'><div>
      <button class="removeBtn" type="button">X</button>
      <img src="${url}?fileName=${arr[i].thumbnailURL}">
      </div></li>`
    }
    uploadUL.innerHTML = str
    const removeBtns = document.querySelectorAll('.removeBtn')
    for (let i = 0; i < removeBtns.length; i++) {
      removeBtns[i].onclick = function () {
        const removeUrl = 'http://localhost:8080/apiserver/removeFile?fileName='
        const targetLi = this.closest('li')
        const fileName = targetLi.dataset.file
        console.log(fileName)
        fetch(removeUrl + fileName, {
          method: 'POST',
          dataType: 'json',
          fileName: fileName,
          headers: {Authorization: `Bearer ${token}`}
        })
          .then(response => response.json())
          .then(json => {
            console.log(json)
            if (json === true) targetLi.remove()
            document.querySelector('#custom-label').innerHTML = ''
            document.querySelector('#fileInput').value = ''
          })
          .catch(err => console.log('Error occurred: ', err))
      }
    }
  }

  const fileChange = useCallback(() => {
    const formData = new FormData()
    const fileName = refFile.current?.value.split('\\').pop()
    console.log('>>', fileName)
    const fileList = refFile.current?.files ?? []
    const fileListLength = fileList.length ?? 0
    let appended = false // 파일이 잘 추가되는지 확인
    for (let i = 0; i < fileListLength; i++) {
      if (!checkExtension(fileList[i]?.name, fileList[i].size)) {
        if (refFile.current?.value !== undefined) refFile.current.value = ''
        appended = false
        break
      }
      formData.append('uploadFiles', fileList[i])
      appended = true
    }
    if (!appended) {
      alert('파일의 타입이 알맞지 않습니다.')
      return
    }
    for (const value of formData.values()) console.log(value)
    console.log('>>', token)
    if (token) {
      let url = 'http://localhost:8080/apiserver/uploadAjax'
      fetch(url, {
        method: 'POST',
        body: formData,
        headers: {Authorization: `Bearer ${token}`}
      })
        .then(response => response.json())
        .then(json => {
          console.log(json)
          showResult(json)
        })
        .catch(err => console.log('Error:', err))
    }
  }, [token])

  useEffect(() => {
    const queryParams = []
    if (page) queryParams.push(`page=${page}`) //page 있을 경우
    if (type) queryParams.push(`type=${type}`)
    if (keyword) queryParams.push(`keyword=${keyword}`)

    let url = 'http://localhost:8080/apiserver/journal/modify/'
    if (queryParams.length > 0) url += jno + '?' + queryParams.join('&')

    if (token) {
      fetch(url, {
        method: 'GET',
        headers: {Authorization: `Bearer ${token}`}
      })
        .then(res => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`)
          }
          return res.json()
        })
        .then(data => {
          setJournalDTO(data.journalDTO)
        })
        .catch(err => console.log('Error:', err))
    }
  }, [jno, token])

  const transDateFormat = useCallback((d: string) => {
    const date = new Date(Date.parse(d ?? ''))
    return (
      [
        date.getFullYear(),
        padTwoDigits(date.getMonth() + 1),
        padTwoDigits(date.getDate())
      ].join('-') +
      ' ' +
      [
        padTwoDigits(date.getHours()),
        padTwoDigits(date.getMinutes()),
        padTwoDigits(date.getSeconds())
      ].join(':')
    )
  }, [])

  function padTwoDigits(num: number) {
    return num.toString().padStart(2, '0')
  }

  const addDefaultImg = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = defaultImg
  }

  const goPost = (jno: string, page: string, type: string, keyword: string) => {
    navigate(`/post?jno=${jno}&page=${page}&type=${type}&keyword=${keyword}`, {
      replace: true
    })
  }

  const confirm = async (
    jno: string,
    title: string | null | undefined,
    content: string | null | undefined,
    arr: PhotosDTO[] | null | undefined
  ) => {
    // JounalDTO로 백엔드에 보내짐
    const formDataObj = {
      jno: jno,
      title: title,
      content: content,
      //membersDTO: {mid: mid},
      photosDTOList: arr // PhotosDTO 타입의 배열 (클라이언트에서 JSON으로 보낼 데이터)
    }

    try {
      new Promise((resolve, reject) => {
        // prettier ignore
        fetch('http://localhost:8080/apiserver/journal/modify', {
          method: 'PUT',
          headers: {'Content-Type': 'application/json', Authorization: `Bearer ${token}`},
          body: JSON.stringify(formDataObj)
        })
          .then(res => res.json())
          .then(data => {
            console.log('' + data.msg + ',' + data.jno)
            navigate(`/post?jno=${jno}&page=${page}&type=${type}&keyword=${keyword}`, {
              replace: true
            })
          })
          .catch(err => console.log('Error:', err))
      })
    } catch (error) {
    } finally {
    }
  }
  const onConfirm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    if (refTitle.current?.value === '') {
      if (refTitle.current !== null) {
        refTitle.current.setAttribute('placeholder', 'Please Check Title')
        refTitle.current.focus()
      }
      return
    }
    if (refContent.current?.value === '') {
      if (refContent.current !== null) {
        refContent.current.setAttribute('placeholder', 'Please Check Content')
        refContent.current.focus()
      }
      return
    }

    const liArr = document.querySelectorAll('.uploadResult ul li')
    let str = ''
    let arr: PhotosDTO[] = []
    for (let i = 0; i < liArr.length; i++) {
      str += `
            <input type="hidden" name="photosDTOList[${i}].photosName" value="${liArr[i].dataset.name}">
            <input type="hidden" name="photosDTOList[${i}].path" value="${liArr[i].dataset.path}">
            <input type="hidden" name="photosDTOList[${i}].uuid" value="${liArr[i].dataset.uuid}">
          `
      console.log('>>', liArr[i].id)
      arr.push({
        photosName: liArr[i].dataset.name,
        path: liArr[i].dataset.path,
        uuid: liArr[i].dataset.uuid
      })
    }
    setInputHiddens(str)
    arr.forEach((photo, index) => {
      formData.append(`photosDTOList[${index}].uuid`, photo.uuid)
      formData.append(`photosDTOList[${index}].photosName`, photo.photosName)
      formData.append(`photosDTOList[${index}].path`, photo.path)
    })
    console.log('>>')
    console.log(arr)
    confirm(jno, refTitle.current?.value, refContent.current?.value, arr)
  }

  return (
    <>
      <header
        className="masthead"
        style={{backgroundImage: `url('assets/img/home-bg.jpg')`}}>
        <div className="container position-relative px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
              <div className="post-heading">
                <h1>Man must explore, and this is exploration at its greatest</h1>
                <h2 className="subheading">
                  Problems look mighty small from 150 miles up
                </h2>
                <span className="meta">
                  Posted by
                  <a href="#!"> Start Journal on</a>
                  on August 24, 2023
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>
      <article className="mb-4">
        <div className="container px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
              <form
                action="/journal/modify"
                method="post"
                id="frmSend"
                onSubmit={onConfirm}>
                <div className="form-group">
                  <label>Jno</label>
                  <input
                    type="text"
                    defaultValue={journalDTO?.jno || ''}
                    name="jno"
                    className="form-control"
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    name="title"
                    ref={refTitle}
                    defaultValue={journalDTO?.title || ''}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Content</label>
                  <input
                    name="content"
                    ref={refContent}
                    defaultValue={journalDTO?.content || ''}
                    className="form-control"
                  />
                </div>
                <div style={{marginBottom: '30px'}}>
                  <label>Comments Count</label>
                  <input
                    type="text"
                    name="commentsCnt"
                    className="form-control"
                    readOnly
                    value={journalDTO?.commentsCnt ?? 0}
                  />
                </div>
                <div style={{marginBottom: '30px'}}>
                  <label>Likes</label>
                  <input
                    type="text"
                    name="likes"
                    readOnly
                    className="form-control"
                    value={journalDTO?.likes ?? 0}
                  />
                </div>
                <div className="form-group">
                  <label>RegDate</label>
                  <input
                    type="text"
                    className="form-control"
                    value={transDateFormat(journalDTO?.regDate ?? '')}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label>ModDate</label>
                  <input
                    type="text"
                    className="form-control"
                    value={transDateFormat(journalDTO?.modDate ?? '')}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="fileInput">Select Image Files</label>
                  <input
                    type="file"
                    id="fileInput"
                    onChange={fileChange}
                    className="custom-file-input form-control files"
                    multiple></input>
                  <label id="custom-label"></label>
                </div>
                <div
                  className="box"
                  dangerouslySetInnerHTML={{__html: transform(inputHiddens)}}></div>
                <br />
                <div className="form-group">
                  <input type="hidden" name="page" value={page} />
                  <input type="hidden" name="type" value={type} />
                  <input type="hidden" name="keyword" value={keyword} />
                  <button className="btn btn-primary p-2">Confirm</button>
                  <button
                    type="button"
                    className="btn btn-info btnBack p-2"
                    onClick={() => {
                      goPost(jno, page, type ?? '', keyword ?? '')
                    }}>
                    Back
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger p-2 ms-2"
                    onClick={() => {
                      if (window.confirm('정말 삭제하시겠습니까?')) {
                        fetch(`http://localhost:8080/apiserver/journal/remove/${jno}`, {
                          method: 'DELETE',
                          headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json'
                          },
                          body: JSON.stringify({
                            page: page,
                            size: '10',
                            type: type,
                            keyword: keyword
                          })
                        })
                          .then(res => res.json())
                          .then(data => {
                            alert(data.msg)
                            navigate(
                              `/list?page=${data.page}&type=${data.type}&keyword=${data.keyword}`
                            )
                          })
                          .catch(err => console.log('삭제 중 오류:', err))
                      }
                    }}>
                    Delete
                  </button>
                </div>
              </form>
              <div className="uploadResult">
                <ul>
                  {journalDTO?.photosDTOList.map((photosDTO, idx) => (
                    <li
                      key={idx}
                      data-filet={photosDTO.getThumbnailURL}
                      data-file={photosDTO.getPhotosURL}
                      data-path={photosDTO.path}
                      data-uuid={photosDTO.uuid}
                      data-name={photosDTO.photosName}
                      style={{cursor: 'pointer'}}>
                      {photosDTO.path == null ? (
                        <img
                          key={idx}
                          src={defaultImg}
                          style={{display: 'inline-block', marginRight: '20px'}}
                          alt="Journal Thumbnail"
                        />
                      ) : (
                        <img
                          key={idx}
                          src={`http://localhost:8080/apiserver/display?fileName=${photosDTO.thumbnailURL}`}
                          style={{display: 'inline-block', marginRight: '20px'}}
                          alt="Journal Thumbnail"
                          onError={addDefaultImg}
                        />
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              <div
                className="list-group comments-list"
                style={{marginBottom: '50px'}}></div>
              <div
                className="modal fade"
                id="myModal"
                tabIndex={-1}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="exampleModalLabel">
                        Modal title
                      </h1>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"></button>
                    </div>
                    <div className="modal-body"></div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal">
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}
