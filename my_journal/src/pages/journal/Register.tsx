import {FormEvent, useCallback, useEffect, useRef, useState} from 'react'
import {useToken} from '../../hooks'
import {useNavigate, useSearchParams} from 'react-router-dom'

interface PhotosDTO {
  uuid: string | Blob
  photosName: string | Blob
  path: string | Blob
}

export function Register() {
  const token = useToken()
  const [query] = useSearchParams()
  const navigate = useNavigate()

  const refFile = useRef<HTMLInputElement | null>(null)
  const refTitle = useRef<HTMLInputElement | null>(null)
  const refContent = useRef<HTMLTextAreaElement | null>(null)
  const [mid, setMid] = useState('')

  useEffect(() => {
    const email = sessionStorage.getItem('email')
    const url = 'http://localhost:8080/apiserver/members/get'
    if (token) {
      fetch(url + '?email=' + email, {
        method: 'GET',
        headers: {Authorization: `Bearer ${token}`}
      })
        .then(res => {
          if (res.status !== 200) {
            throw new Error(`HTTP error! status: ${res.status}`)
          }
          return res.json()
        })
        .then(data => {
          console.log('>>>', data.mid)
          setMid(data.mid)
        })
        .catch(err => {
          console.log('Error:', err)
        })
    }
  }, [token])

  const transform = (str: string) => {
    return str.replace(/\n/g, '')
  }
  const [inputHiddens, setInputHiddens] = useState('')

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
      data-uuid='${arr[i].uuid}' data-file='${arr[i].imageURL}'><div>
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

  const journalSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('cliked')
    let compare = query.get('page')
    const page = compare === 'null' || compare == null ? '1' : compare
    compare = query.get('type')
    const type = compare === 'null' || compare == null ? '' : compare
    compare = query.get('keyword')
    const keyword = compare === 'null' || compare == null ? '' : compare

    const formData = new FormData(e.currentTarget)
    const title = refTitle.current
    if (!title?.value) {
      title?.focus()
      return false
    }
    const content = refContent.current
    if (!content?.value) {
      content?.focus()
      return false
    }
    let str = ''
    const liArr = document.querySelectorAll('.uploadResult ul li')
    let arr: PhotosDTO[] = []
    for (let i = 0; i < liArr.length; i++) {
      str += `
            <input type="hidden" name="photosDTOList[${i}].photosName" value="${liArr[i].dataset.name}">
            <input type="hidden" name="photosDTOList[${i}].path" value="${liArr[i].dataset.path}">
            <input type="hidden" name="photosDTOList[${i}].uuid" value="${liArr[i].dataset.uuid}">
          `
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
    // JounalDTO로 백엔드에 보내짐
    const formDataObj = {
      title: refTitle.current?.value ?? '',
      content: refContent.current?.value ?? '',
      membersDTO: {mid: mid},
      photosDTOList: arr // PhotosDTO 타입의 배열 (클라이언트에서 JSON으로 보낼 데이터)
    }
    let resMessage = ''
    if (token) {
      fetch('http://localhost:8080/apiserver/journal/register', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json;charset=utf-8'
        },
        //JavaScript 값이나 객체를 JSON 문자열로 변환
        body: JSON.stringify(formDataObj)
      })
        .then(res => res.text())
        .then(data => {
          console.log(data)
          resMessage = data
        })
        .catch(err => console.log('Error: ' + err))
      navigate(`/list?page=${page}&type=${type}&keyword=${keyword}&$msg=${resMessage}`)
    } else {
      navigate(`/`)
    }
  }

  return (
    <>
      <header
        className="masthead"
        style={{backgroundImage: `url('assets/img/register-bg.jpg')`}}>
        <div className="container position-relative px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
              <div className="page-heading">
                <h1>Register Journal</h1>
                <span className="subheading">
                  Fill your journal with the whispers of your soul, for every page is a
                  step on the journey of your heart.
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="mb-4">
        <div className="container px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
              <p></p>
              <div className="my-5">
                <form method="post" onSubmit={journalSubmit}>
                  <div className="form-floating">
                    <input
                      className="form-control"
                      id="title"
                      name="title"
                      ref={refTitle}
                      type="text"
                      placeholder="Input Title"
                      data-sb-validations="required"
                    />
                    <label htmlFor="title">Title</label>
                    <div className="invalid-feedback" data-sb-feedback="title:required">
                      A Title is required.
                    </div>
                  </div>
                  <div className="form-floating">
                    <textarea
                      className="form-control"
                      id="content"
                      name="content"
                      ref={refContent}
                      placeholder="Enter your Content here..."
                      style={{height: '15rem'}}
                      data-sb-validations="required"></textarea>
                    <label htmlFor="content">Content</label>
                    <div className="invalid-feedback" data-sb-feedback="content:required">
                      A content is required.
                    </div>
                  </div>
                  <div className="form-floating">
                    <input
                      className="custom-file-input form-control files"
                      id="fileInput"
                      type="file"
                      accept="image/*"
                      ref={refFile}
                      onChange={fileChange}
                      multiple
                    />
                  </div>
                  <div
                    className="box"
                    dangerouslySetInnerHTML={{__html: transform(inputHiddens)}}></div>
                  <br />
                  <div className="d-none" id="submitSuccessMessage">
                    <div className="text-center mb-3">
                      <div className="fw-bolder">Form submission successful!</div>
                      To activate this form, sign up at
                      <br />
                      <a href="https://startbootstrap.com/solution/contact-forms">
                        https://startbootstrap.com/solution/contact-forms
                      </a>
                    </div>
                  </div>
                  <div className="d-none" id="submitErrorMessage">
                    <div className="text-center text-danger mb-3">
                      Error sending message!
                    </div>
                  </div>
                  <button
                    className="btn btn-primary text-uppercase p-1"
                    id="submitButton"
                    type="submit">
                    Send
                  </button>
                </form>
                <div className="uploadResult">
                  <ul></ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
