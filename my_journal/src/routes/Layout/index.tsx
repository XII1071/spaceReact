import {Route, Routes} from 'react-router-dom'
import Navigation from './Navigation'
import {About, Contact, List, Register, Post, Modify} from '../../pages/journal'
import Footer from './Footer'

export default function Layout() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route index element={<List />} />
        <Route path="/list" element={<List />} />
        <Route path="/about" element={<About />} />
        <Route path="/post" element={<Post />} />
        <Route path="/modify" element={<Modify />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </>
  )
}
