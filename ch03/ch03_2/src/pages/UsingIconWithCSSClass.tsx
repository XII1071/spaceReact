import {Icon2} from '../components'
import {Icon3} from '../components/Icon3'

export default function UsingIconWithCSSClass() {
  return (
    <div>
      <h4>UsingIconWithCSSClass</h4>
      <Icon2
        name="home"
        className="text-red"
        style={{fontFamily: 'Material Icons', fontSize: '30px'}}
        data-testid="kant"
      />
      <Icon3 name="pets" data-id="Isac Newton" data-job="genius" />
    </div>
  )
}
