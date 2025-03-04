import {FC} from 'react'
import {Link} from 'react-router-dom'

type HomeProps = {
  title?: string
}

const Home: FC<HomeProps> = ({title}) => {
  return (
    <div>
      <div className="flex bg-gray-200 p-4">
        <Link to="/">Home</Link>
        <Link to="/welcome" className="ml-4">
          Welcome
        </Link>
        <Link to="/board" className="ml-4">
          Board
        </Link>
      </div>
      {/* 
      ?.(좌측이 없으면 undefined), 
      ?:(좌측이 없을 수도 있을 때), 
      ??(좌측이 있으면 좌측 없으면 우측) 
      */}
      <p>{title ?? 'Home'}</p>
    </div>
  )
}

export default Home
