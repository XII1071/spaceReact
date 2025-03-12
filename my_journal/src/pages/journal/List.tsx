import {useEffect, useRef, useState} from 'react'
import {useToken} from '../../hooks'
import {useNavigate, useSearchParams} from 'react-router-dom'

interface MembersDTO {
  mid: number
  name: string
  nickname: string
  email: string
  mobile: string
}

interface Journal {
  jno: number
  title: string
  content: string
  photoDTOList: {path: string}[]
  commentsCnt: number
  membersDTO: MembersDTO
  likes: number
  regDate: string
  modDate: string
}

// PageResultDTO 구조 정의
interface PageResultDTO {
  dtoList: Journal[]
  page: number
  start: number
  end: number
  pageList: number[]
  prev: boolean
  next: boolean
}
interface PageRequestDTO {
  page: string
  size: string
  type: string
  keyword: string
}

export function List() {
  const token = useToken()
  const navigation = useNavigate()

  const [query] = useSearchParams() // 웹주소의 쿼리(?이하)를 받기위한 함수
  const [PageRequestDTO, setPageRequestDTO] = useState<PageRequestDTO>({
    page: '',
    size: '',
    type: '',
    keyword: ''
  })

  const refType = useRef<HTMLSelectElement | null>(null)
  const refKeyword = useRef<HTMLInputElement | null>(null)
  const refBtnSrch = useRef<HTMLButtonElement | null>(null)
  const [pageResultDTO, setPageResultDTO] = useState<PageResultDTO | null>(null)
  const [types, setTypes] = useState<string>('')
  const [keyword, setKeywords] = useState<string>('')
  const [disabled, setDisabled] = useState<string>(true)

  const options = [
    {value: '', label: '선택하세요'},
    {value: 't', label: '제목'},
    {value: 'c', label: '내용'},
    {value: 'w', label: '작성자'},
    {value: 'tc', label: '제목 + 내용'},
    {value: 'tcw', label: '제목 + 내용 + 작성자'}
  ]

  useEffect(() => {
    let compare = query.get('page')
    const page = compare === 'null' || compare == null ? '1' : compare
    compare = query.get('type')
    const type = compare === 'null' || compare == null ? '' : compare
    compare = query.get('keyword')
    const keyword = compare === 'null' || compare == null ? '' : compare
    const queryParams = []

    if (page) queryParams.push(`page=${page}`) //page 있을 경우
    if (type) {
      //type이 있을 경우
      setTypes(type)
      setDisabled(false)
      queryParams.push(`type=${type}`)
    }
    if (keyword) {
      // keyword 있을 경우
      queryParams.push(`keyword=${keyword}`)
      setDisabled(false)
    }

    let url = 'http://localhost:8080/apiserver/journal/list'
    if (queryParams.length > 0) url = queryParams.join('&')

    if (token) {
      fetch(url, {
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
          setPageResultDTO(data.pageResultDTO)
          setPagequestDTO(data.pagequestDTO)
          console.log(data.dtoList)
        })
        .catch(err => {
          console.log('Error:', err)
        })
    }
  }, [query, types, token])
  return (
    <>
      <header
        className="masthead"
        style={{backgroundImage: `url('/assets/img/home-bg.jpg')`}}>
        <div className="container position-relative px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
              <div className="post-heading">
                <h1>Let your journal be a place of honesty and self-discovery.</h1>
                <h2 className="subheading">Write your story, one page at a time.</h2>
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

      <div className="container px-4 px-lg-5">
        <div className="row gx-4 gx-lg-5 justify-content-center">
          <div className="col-md-10 col-lg-8 col-xl-7">
            {pageResultDTO?.dtoList.map(function (journal, index) {
              return (
                <div key={index}>
                  {index != 0 ? <hr className="my-4" /> : ''}
                  {/* {index && <hr className="my-4" />} */}
                  <div className="post-preview">
                    <a href="post.html">
                      <h2 className="post-title">{journal.title}</h2>
                      <h3 className="post-subtitle w-50 truncate">{journal.content}</h3>
                    </a>
                    <p className="post-meta">
                      Posted by
                      <a href="#!"> {journal.membersDTO.nickname} </a>
                      on{' '}
                      <span>
                        {new Intl.DateTimeFormat('ko-KR', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit',
                          hour12: false
                        }).format(Date.parse(journal.regDate))}
                      </span>
                    </p>
                  </div>
                </div>
              )
            })}
            <div className="d-flex justify-center mb-4">
              <ul className="pagination h-100 justify-content-center align-items-center">
                {pageResultDTO?.prev && (
                  <li className="page-item">
                    <a
                      className="page-link"
                      href={`/journal/list?page=${Math.max(1, pageResultDTO.start - 1)}`}>
                      Prev
                    </a>
                  </li>
                )}
                {pageResultDTO?.pageList.map(page => (
                  <li
                    key={page}
                    className={`page-item ${
                      pageResultDTO?.page === page ? 'active' : ''
                    }`}>
                    <a className="page-link" href={`/journal/list?page=${page}`}>
                      {page}
                    </a>
                  </li>
                ))}
                {pageResultDTO?.next ? (
                  <li className="page-item">
                    <a
                      className="page-link"
                      href={`/journal/list?page=${pageResultDTO.end + 1}`}>
                      Next
                    </a>
                  </li>
                ) : null}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
