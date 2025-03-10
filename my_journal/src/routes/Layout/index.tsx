import {Route, Routes} from 'react-router-dom'
import Navigation from './Navigation'
import {About, Contact, List, SamplePost} from '../../pages/journal'
import Footer from './Footer'

export default function Layout() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route index element={<List />} />
        <Route path="/list" element={<List />} />
        <Route path="/about" element={<About />} />
        <Route path="/sample-post" element={<SamplePost />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </>
  )
}
