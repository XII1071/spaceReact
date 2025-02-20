import {Icon2, Icon3} from '../components'

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
