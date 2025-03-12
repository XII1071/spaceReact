import {useEffect, useState} from 'react'
import {useToken} from '../../hooks'

interface Journal {
  jno: number
  title: string
  content: string
  photoDTOList: {path: string}[]
  commentsCnt: number
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

export function List() {
  const token = useToken()
  const [pageResultDTO, setPageResultDTO] = useState<PageResultDTO | null>(null)

  useEffect(() => {
    const url = 'http://localhost:8080/apiserver/journal/list'
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
        })
        .catch(err => {
          console.log('Error:', err)
        })
    }
  }, [])
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
      {/* prettier-ignore */}
      <div className="container px-4 px-lg-5">
            <div className="row gx-4 gx-lg-5 justify-content-center">
                <div className="col-md-10 col-lg-8 col-xl-7">
                  {pageResultDTO?.dtoList.length && (<hr className="my-4" />)}
                  {pageResultDTO?.dtoList.map(function(journal){
                    return (
                      <div className="post-preview">
                        <a href="post.html">
                            <h2 className="post-title">{journal.title}</h2>
                            <h3 className="post-subtitle">{journal.content}</h3>
                        </a>
                        <p className="post-meta">
                            Posted by
                            <a href="#!"> Start Journal on</a>
                            on  {new Intl.DateTimeFormat('ko-KR', {
                                  year: 'numeric',
                                  month: '2-digit',
                                  day: '2-digit',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                  second: '2-digit',
                                  hour12: false 
                                }).format(Date.parse(journal.regDate))}
                        </p>
                      </div>
                    )
                  })}
                    <div className="d-flex justify-content-end mb-4"><a className="btn btn-primary text-uppercase" href="#!">Older Posts →</a></div>
                </div>
            </div>
        </div>
    </>
  )
}
