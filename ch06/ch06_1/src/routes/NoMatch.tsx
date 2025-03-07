import {useCallback} from 'react'
import {Button} from '../theme/daisyui'
import {useNavigate} from 'react-router-dom'

export default function NoMatch() {
  const navigate = useNavigate()
  const goBack = useCallback(() => {
    navigate(-1)
  }, [navigate])
  return (
    <div>
      <p className="text-xl text-center p-4 alert alert-error">Ooops! No page found!</p>
      <div>
        <Button className="ml-4 btn-primary btn-xs" onClick={goBack}>
          GO BACK
        </Button>
      </div>
    </div>
  )
}
