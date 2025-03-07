import NavigationBar from './NavigationBar'
import {Outlet} from 'react-router-dom'
import Footer from './Footer'

export default function Layout() {
  return (
    <>
      <NavigationBar /> {/* header */}
      <Outlet /> {/* content */}
      <Footer /> {/* footer */}
    </>
  )
}
