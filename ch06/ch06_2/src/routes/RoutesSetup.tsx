import {Route, Routes} from 'react-router-dom'
import NoMatch from './NoMatch'
import Layout from './Layout'
import Board from '../pages/Board'
import Register from '../pages/Board/Register'
import Read from '../pages/Board/Read'
import LandingPage from '../pages/LandingPage'

export default function RoutesSetup() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="/board" element={<Board />} />
        <Route path="/board/list" element={<Board />} />
        <Route path="/board/register" element={<Register />} />
        <Route path="/board/read/:bid" element={<Read />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  )
}
