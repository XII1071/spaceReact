import {SyntheticEvent, useCallback, useEffect, useState} from 'react'
import {useNavigate, useSearchParams} from 'react-router-dom'
import defaultImg from '../../assets/no-img.gif'
import {useToken} from '../../hooks'

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

export function Post() {
  const token = useToken()
  const navigate = useNavigate()
  const [journalDTO, setJournalDTO] = useState<JournalDTO | null>(null)

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

  useEffect(() => {
    const queryParams = []
    if (page) queryParams.push(`page=${page}`) //page 있을 경우
    if (type) queryParams.push(`type=${type}`)
    if (keyword) queryParams.push(`keyword=${keyword}`)

    let url = 'http://52.62.172.179/apiserver/journal/read/'
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
      loadCommentsJSON()
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

  // Ajax로 리뷰 불러오기
  const loadCommentsJSON = () => {
    const url = 'http://52.62.172.179/apiserver/comments/all/'
    const listGroup = document.querySelector('.comments-list')
    fetch(url + jno, {method: 'GET', headers: {Authorization: `Bearer ${token}`}})
      .then(response => response.json())
      .then(data => {
        let str = ''
        for (let i = 0; i < data.length; i++) {
          str += `<div class="card-body form-control mb-1"
        onmouseover="this.style.background='#d6e6ff'"
        onmouseout="this.style.background='white'"
        data-mid="${data[i].mid}" data-text="${data[i].text}"
        data-likes="${data[i].likes}" data-nickname="${data[i].nickname}"
        data-email="${data[i].email}" data-cno="${data[i].cno}"
        style="padding: 5px 20px;cursor:pointer;">
          <div style="display:inline-block;width:68%;">
            <h6 style="display:inline-block;width:70px">${data[i].cno}</h6>
            <h5 class="card-text" style="display:inline-block;">${data[i].text}
            ${data[i].likes ? '♥' : ''}</h5>
          </div>
          <div style="display:inline-block;width:30%;text-align: right;right-padding:12px;">
            <span class="card-subtitle text-muted" style="font-size:10px">${
              data[i].nickname
            } /
             ${data[i].email}</span>
            <span class="card-subtitle text-muted"
            style="display:inline-block;width:150px;color:rgb(148 163 184);font-size:12px;"
            >${transDateFormat(data[i].regDate)}</span>
          </div>
        </div>`
        }
        listGroup.innerHTML = str
        const cardBody = document.querySelectorAll('.card-body')
        for (let i = 0; i < cardBody.length; i++) {
          // 리뷰 상세보기
          cardBody[i].onclick = function () {
            let cno = cardBody[i].dataset.cno
            let text = cardBody[i].dataset.text
            let mid = cardBody[i].dataset.mid
            let likes = cardBody[i].dataset.likes
            let nickname = cardBody[i].dataset.nickname
            document.querySelector('#exampleModalLabel').textContent = 'No ' + cno
            document.querySelector(
              '.modal-body'
            ).innerHTML = `<input type="hidden" name="cno" value="${cno}" readonly>
             <input type="hidden" name="mid" value="${mid}" readonly>
             <label>Likes</label><span>${likes}</span><br>
             <input type="text" class="form-control" name="text" value="${text}">
            `
            document.querySelector(
              '.modal-footer'
            ).innerHTML = `<button type="button" class="btn btn-danger remove">리뷰 삭제</button>
             <button type="button" class="btn btn-warning modify">리뷰 수정</button>
             <span class="btn btn-secondary" data-bs-dismiss="modal">Close</span>
            `
            document.querySelector('.modal-footer .modify').onClick = function () {
              let cno = document.querySelector(".modal-body input[name='cno']")
              let text = document.querySelector(".modal-body input[name='text']")
              let mid = document.querySelector(".modal-body input[name='mid']")
              let likes =
                parseFloat(document.querySelector('.star span')?.style.width) * 0.01 * 5
              let notice = document.querySelector('#notice')

              if (!text?.value) {
                text?.setAttribute('placeholder', '댓글입력하세요')
                text?.focus()
                return
              }
              if (!likes) {
                notice.textContent = 'Select Grade!'
                return
              }
              let comments = {
                jno: jno,
                text: text?.value,
                mid: mid?.value,
                likes: likes,
                cno: cno?.value
              }
              const url = /*[[@{/comments/}]]*/ 'url'
              fetch(url + jno + '/' + cno?.value, {
                method: 'PUT',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(comments)
              })
                .then(res => res.json())
                .then(function (data) {
                  document.querySelector('#exampleModalLabel').innerHTML = `수정 알림`
                  document.querySelector(
                    '.modal-body'
                  ).innerHTML = `${data}번 댓글 수정 완료.`
                  document.querySelector('.modal-footer .modify').style.display = 'none'
                  document.querySelector('.modal-footer .remove').style.display = 'none'
                  loadCommentsJSON()
                })
                .catch(err => console.log('myError', err))
            }
            document.querySelector('.modal-footer .remove').onclick = function () {
              let cno = document.querySelector(".modal-body input[name='cno']")
              const url = 'http://52.62.172.179/apiserver/comments/'
              fetch(url + jno + '/' + cno.value, {
                method: 'DELETE',
                headers: {'Content-type': 'application/json'}
              })
                .then(res => res.json())
                .then(async function (data) {
                  document.querySelector('#exampleModalLabel').innerHTML = `삭제 알림`
                  document.querySelector(
                    '.modal-body'
                  ).innerHTML = `${data}번 댓글 삭제 완료.`
                  document.querySelector('.modal-footer .modify').style.display = 'none'
                  document.querySelector('.modal-footer .remove').style.display = 'none'
                  document.querySelector('#commentsCnt').textContent =
                    parseInt(document.querySelector('#commentsCnt').textContent) - 1
                  loadCommentsJSON()
                })
                .catch(err => console.log('myError', err))
            }
          }
        }
      })
  }

  const goList = (page: string, type: string, keyword: string) => {
    navigate(`/list?page=${page}&type=${type}&keyword=${keyword}`, {replace: true})
  }
  const goModify = (jno: string, page: string, type: string, keyword: string) => {
    navigate(`/modify?jno=${jno}&page=${page}&type=${type}&keyword=${keyword}`, {
      replace: true
    })
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
              <form action="/journal/modify" method="post" id="frmSend">
                <div className="form-group">
                  <label>Jno</label>
                  <input
                    type="text"
                    value={journalDTO?.jno || ''}
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
                    value={journalDTO?.title || ''}
                    className="form-control"
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label>Content</label>
                  <input
                    type="text"
                    name="content"
                    value={journalDTO?.content || ''}
                    className="form-control"
                    readOnly
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
                {/* <div className="form-group">
          <label htmlFor="fileInput">Select Image Files</label>
          <input
            type="file"
            id="fileInput"
            className="custom-file-input form-control files"
            multiple></input>
          <label id="custom-label"></label>
        </div> 
        <div className="box"></div>*/}
                <div className="form-group">
                  <input type="hidden" name="page" value={page} />
                  <input type="hidden" name="type" value={type} />
                  <input type="hidden" name="keyword" value={keyword} />
                  <button
                    className="btn btn-primary p-2"
                    type="button"
                    onClick={() => {
                      goModify(jno, page, type ?? '', keyword ?? '')
                    }}>
                    Modify
                  </button>
                  <button
                    type="button"
                    className="btn btn-info btnBack p-2"
                    onClick={() => {
                      goList(page, type ?? '', keyword ?? '')
                    }}>
                    Back
                  </button>
                </div>
              </form>
              <div className="uploadResult">
                <ul>
                  {journalDTO?.photosDTOList.map((photosDTO, idx) => (
                    <li
                      key={idx}
                      data-file="${photosDTO.getThumbnailURL}"
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
                          src={`http://52.62.172.179/apiserver/display?fileName=${photosDTO.thumbnailURL}`}
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
                tabIndex="-1"
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
