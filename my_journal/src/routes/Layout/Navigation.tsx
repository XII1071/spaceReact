import {useEffect, useState, useRef} from 'react'

export default function Navigation() {
  const [scrollPos, setScrollPos] = useState(0)
  const mainNavRef = useRef<HTMLElement | null>(null)
  useEffect(() => {
    const handleScroll = () => {
      const mainNav = mainNavRef.current
      if (!mainNav) return

      const currentTop = window.scrollY
      const headerHeight = mainNav.clientHeight

      if (currentTop < scrollPos) {
        // Scrolling Up
        if (currentTop > 0 && mainNav.classList.contains('is-fixed')) {
          mainNav.classList.add('is-visible')
        } else {
          mainNav.classList.remove('is-visible', 'is-fixed')
        }
      } else {
        // Scrolling Down
        mainNav.classList.remove('is-visible')
        if (currentTop > headerHeight && !mainNav.classList.contains('is-fixed')) {
          mainNav.classList.add('is-fixed')
        }
      }
      setScrollPos(currentTop)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrollPos])

  // prettier-ignore
  return (
    <nav ref={mainNavRef} className="navbar navbar-expand-lg navbar-light" id="mainNav">
        <div className="container px-4 px-lg-5">
            <a className="navbar-brand" href="index.html">Start Bootstrap</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                Menu
                <i className="fas fa-bars"></i>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav ms-auto py-4 py-lg-0">
                    <li className="nav-item"><a className="nav-link px-lg-3 py-3 py-lg-4" href="index.html">Home</a></li>
                    <li className="nav-item"><a className="nav-link px-lg-3 py-3 py-lg-4" href="about.html">About</a></li>
                    <li className="nav-item"><a className="nav-link px-lg-3 py-3 py-lg-4" href="post.html">Sample Post</a></li>
                    <li className="nav-item"><a className="nav-link px-lg-3 py-3 py-lg-4" href="contact.html">Contact</a></li>
                </ul>
            </div>
        </div>
    </nav>
  )
}
