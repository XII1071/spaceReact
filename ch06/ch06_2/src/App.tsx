import {BrowserRouter} from 'react-router-dom'
import RoutesSetup from './routes/RoutesSetup'

export default function App() {
  return (
    <BrowserRouter>
      <RoutesSetup />
    </BrowserRouter>
  )
}
