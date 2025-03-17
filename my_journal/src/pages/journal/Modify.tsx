import {SyntheticEvent, useCallback, useEffect, useState} from 'react'
import {useNavigate, useLocation} from 'react-router-dom'
import defaultImg from '../../assets/no-img.gif'

interface JournalDTO {
  jno: number
  title: string
  content: string
  photosDTOList: {path: string}[]
  commentsCnt: number
  likes: number
  regDate: string
  modDate: string
}

export function Modify() {
  const navigate = useNavigate()
  const location = useLocation()
  const journalDTO: JournalDTO = location.state?.journalDTO || {}

  const [title, setTitle] = useState(journalDTO.title || '')
  const [content, setContent] = useState(journalDTO.content || '')

  // 날짜 포맷 변환
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

  // ✅ 수정 처리 (PUT 요청)
  const handleModify = () => {
    fetch(`http://localhost:8080/apiserver/journal/modify`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        jno: journalDTO.jno,
        title: title,
        content: content
      })
    })
      .then(res => {
        if (!res.ok) throw new Error(`수정 실패: ${res.status}`)
        return res.json()
      })
      .then(() => {
        alert('수정 완료!')
        navigate(`/post?jno=${journalDTO.jno}`) // 수정 후 Post.tsx로 이동
      })
      .catch(err => console.error('❌ 수정 중 오류 발생:', err))
  }

  // ✅ 삭제 처리 (DELETE 요청)
  const handleDelete = () => {
    if (!window.confirm('정말로 삭제하시겠습니까?')) return

    fetch(`http://localhost:8080/apiserver/journal/remove/${journalDTO.jno}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'}
    })
      .then(res => {
        if (!res.ok) throw new Error(`삭제 실패: ${res.status}`)
        return res.json()
      })
      .then(() => {
        alert('삭제 완료!')
        navigate('/') // 삭제 후 홈으로 이동
      })
      .catch(err => console.error('❌ 삭제 중 오류 발생:', err))
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
                <h1>Modify Post</h1>
                <h2 className="subheading">Edit your journal entry</h2>
                <span className="meta">Jno: {journalDTO.jno}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <article className="mb-4">
        <div className="container px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
              <form>
                <div className="form-group">
                  <label>Jno</label>
                  <input
                    type="text"
                    value={journalDTO.jno}
                    className="form-control"
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Content</label>
                  <textarea
                    className="form-control"
                    value={content}
                    onChange={e => setContent(e.target.value)}></textarea>
                </div>
                <div className="form-group">
                  <label>RegDate</label>
                  <input
                    type="text"
                    className="form-control"
                    value={transDateFormat(journalDTO.regDate)}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label>ModDate</label>
                  <input
                    type="text"
                    className="form-control"
                    value={transDateFormat(journalDTO.modDate)}
                    readOnly
                  />
                </div>

                {/* ✅ 버튼 영역 */}
                <div className="form-group mt-3">
                  <button
                    type="button"
                    className="btn btn-success p-2"
                    onClick={handleModify}>
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger p-2 ms-2"
                    onClick={handleDelete}>
                    Delete
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary p-2 ms-2"
                    onClick={() => navigate(-1)}>
                    Back
                  </button>
                </div>
              </form>

              {/* 이미지 표시 */}
              <div className="uploadResult mt-3">
                <ul>
                  {journalDTO.photosDTOList.map((photosDTO, idx) => (
                    <li key={idx} style={{cursor: 'pointer'}}>
                      <img
                        src={`http://localhost:8080/apiserver/display?fileName=${photosDTO.path}`}
                        alt="Thumbnail"
                        style={{width: '100px', marginRight: '10px'}}
                        onError={addDefaultImg}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}
