import {Route, Routes} from 'react-router-dom'
import Navigation from './Navigation'

export default function Layout() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/content" element={<LayoutContent />}>
          <Route index element={<List />} />
          <Route path="/" element={<List />} />
          <Route path="/" element={<About />} />
          <Route path="/" element={<SamplePost />} />
          <Route path="/" element={<Contact />} />
        </Route>
      </Routes>
    </>
  )
}
