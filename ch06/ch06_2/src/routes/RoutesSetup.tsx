import {Route, Routes} from 'react-router-dom'
import Board from '../pages/Board'
import Read from '../pages/Board/Read'
import Register from '../pages/Board/Register'
import Layout from './Layout'
import NoMatch from './NoMatch'
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
