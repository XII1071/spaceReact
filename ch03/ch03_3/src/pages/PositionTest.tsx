import {Div, Title, Icon} from '../components'
import * as D from '../data'

const src = D.randomImage(800, 500)
// prettier-ignore
export default function PositionTest() {
  const icons = ['home', 'search', 'settings', 'favorite'].map(name => (
    <Icon key={name} name={name} className="mr-2" />
  ))
  return (
    <Div>
      <Title>PositionTest</Title>
      <Div className="relative border-2 border-gray-500"
        src={src} height="10rem" style={{overflow: 'auto'}}>
        <Div className="absolute p-2 text-white bg-red-500 z-50"
          left="0.5rem" top="0.5rem">{icons}</Div>
        <Div className="absolute p-2 text-white bg-blue-500 z-30"
          left="1rem" top="1rem">{icons}</Div>
        <Div className="absolute p-2 text-white bg-pink-500 z-20"
          left="1.5rem" top="1.5rem">{icons}</Div>
        <Div className="absolute p-2 text-white bg-yellow-500 z-0"
          left="2rem" top="2rem">{icons}</Div>
      </Div>
    </Div>
  )
}
