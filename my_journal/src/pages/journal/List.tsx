export function List() {
  return (
    <>
      <header
        className="masthead"
        style={{backgroundImage: `url('/assets/img/post-bg.jpg')`}}>
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
                    <div className="post-preview">
                        <a href="post.html">
                            <h2 className="post-title">Let your journal be a place of honesty and self-discovery.</h2>
                            <h3 className="post-subtitle">Write your story, one page at a time.</h3>
                        </a>
                        <p className="post-meta">
                            Posted by
                            <a href="#!"> Start Journal on</a>
                            on September 24, 2023
                        </p>
                    </div>
                    <hr className="my-4" />
                    <div className="post-preview">
                        <a href="post.html"><h2 className="post-title">I believe every human has a finite number of heartbeats. I don't intend to waste any of mine.</h2></a>
                        <p className="post-meta">
                            Posted by
                            <a href="#!"> Start Journal on</a>
                            on September 18, 2023
                        </p>
                    </div>
                    <hr className="my-4" />
                    <div className="post-preview">
                        <a href="post.html">
                            <h2 className="post-title">Science has not yet mastered prophecy</h2>
                            <h3 className="post-subtitle">We predict too much for the next year and yet far too little for the next ten.</h3>
                        </a>
                        <p className="post-meta">
                            Posted by
                            <a href="#!"> Start Journal on</a>
                            on August 24, 2023
                        </p>
                    </div>
                    <hr className="my-4" />
                    <div className="post-preview">
                        <a href="post.html">
                            <h2 className="post-title">Failure is not an option</h2>
                            <h3 className="post-subtitle">Many say exploration is part of our destiny, but it’s actually our duty to future generations.</h3>
                        </a>
                        <p className="post-meta">
                            Posted by
                            <a href="#!"> Start Journal on</a>
                            on July 8, 2023
                        </p>
                    </div>
                    <hr className="my-4" />
                    <div className="d-flex justify-content-end mb-4"><a className="btn btn-primary text-uppercase" href="#!">Older Posts →</a></div>
                </div>
            </div>
        </div>
    </>
  )
}
