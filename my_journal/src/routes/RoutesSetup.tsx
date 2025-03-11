import {Route, Routes} from 'react-router-dom'
import {Login, Join} from '../pages/members'
import Layout from './Layout'
import PrivateRoute from './PrivateRoute'

export default function RoutesSetup() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/join" element={<Join />} />
      <Route path="/*" element={<PrivateRoute component={Layout} />} />
    </Routes>
  )
}
