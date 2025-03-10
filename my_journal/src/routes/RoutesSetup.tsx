import {Route, Routes} from 'react-router-dom'
import NoMatch from './NoMatch'
import {Login, Join} from '../pages/members'
import Layout from './Layout'
import PrivateRoute from './PrivateRoute'
import {Component} from 'react'

export default function RoutesSetup() {
  return (
    <Routes>
      <Route path="/" element={<Login />}>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute component={Layout} />} />
        <Route path="/content/*" element={<Layout />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  )
}
