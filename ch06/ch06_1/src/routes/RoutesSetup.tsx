import {Route, Routes} from 'react-router-dom'
import NoMatch from './NoMatch'
import Home from './Home'
import Board from '../pages/Board'

export default function RoutesSetup() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/welcome" element={<Home title="Welcome to our site" />} />
      <Route path="/board" element={<Board />} />
      <Route path="/board/list" element={<Board />} />
      <Route path="/board/list/:bid" element={<Board />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  )
}
