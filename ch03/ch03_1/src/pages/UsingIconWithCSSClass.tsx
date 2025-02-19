import {Icon2} from '../components'

export default function UsingIconWithCSSClass() {
  return (
    <div>
      <h4>UsingIconWithCSSClass</h4>
      <Icon2
        name="home"
        className="text-red"
        style={{font: 'material-icons', fontSize: '30px'}}
      />
    </div>
  )
}
