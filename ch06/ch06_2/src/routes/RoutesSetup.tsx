import {Route, Routes} from 'react-router-dom'
import NoMatch from './NoMatch'
import Layout from './Layout'
import Board from '../pages/Board'
import List from '../pages/Board/List'
import Register from '../pages/Board/Register'

export default function RoutesSetup() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/board" element={<Board />} />
        <Route path="/board/list" element={<Board />} />
        <Route path="/board/register" element={<Register />} />
        <Route path="/board/list/:bid" element={<List />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  )
}
