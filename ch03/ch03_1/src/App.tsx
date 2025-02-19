import './App.css'
import Bootstrap from './pages/Bootstrap'
import Icons from './pages/Icons'
import Style from './pages/Style'
import UsingIcon from './pages/UsingIcon'
import UsingIconWithCSSClass from './pages/UsingIconWithCSSClass'

function App() {
  return (
    <div>
      <UsingIconWithCSSClass />
      <UsingIcon />
      <Style />
      <Icons />
      <Bootstrap />
    </div>
  )
}

export default App
