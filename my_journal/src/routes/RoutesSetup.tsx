import {Route, Routes} from 'react-router-dom'
import NoMatch from './NoMatch'
import {Login, Join} from '../pages/members'
import Layout from './Layout'

export default function RoutesSetup() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/join" element={<Join />} />
      <Route path="/layout/*" element={<Layout />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  )
}
