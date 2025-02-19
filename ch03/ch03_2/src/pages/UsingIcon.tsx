import {Icon} from '../components'

export default function UsingIcon() {
  return (
    <div>
      <h4>UsingIcon(사용자 컴포넌트 적용)</h4>
      <Icon
        name="bolt"
        style={{color: 'blue', fontFamily: 'Material Icons', fontSize: '30px'}}
      />
    </div>
  )
}
