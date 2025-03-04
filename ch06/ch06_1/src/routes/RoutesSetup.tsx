import {Route, Routes} from 'react-router-dom'
import NoMatch from './NoMatch'
import Home from './Home'
import List from '../pages/Board/List'
import Read from '../pages/Board/Read'
import Register from '../pages/Board/Register'

export default function RoutesSetup() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/welcome" element={<Home title="Welcome to our site" />} />
      <Route path="/board" element={<List />} />
      <Route path="/board/list" element={<List />} />
      <Route path="/board/list/:bid" element={<Read />} />
      <Route path="/board/register" element={<Register />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  )
}
