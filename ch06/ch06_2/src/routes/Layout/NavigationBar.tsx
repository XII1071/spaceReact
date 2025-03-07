import {Link} from 'react-router-dom'

export default function NavigationBar() {
  // prettier-ignore
  return (
    <div>
      <div className="flex bg-gray-200 p-4">
        <Link to="/">Home</Link>
        <Link to="/board" className="ml-4">Board</Link>
      </div>
    </div>
  )
}
