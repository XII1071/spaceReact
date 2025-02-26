import {Title, Subtitle} from '../components'
import {useWindowResize} from '../hooks'

export default function WindowResizeTest() {
  const [width, height] = useWindowResize() //커스텀 훅 호출
  return (
    <section className="mt-4">
      <Title>WindowResizeTest</Title>
      <Subtitle className="mt-4">
        width: {width}, height: {height}
      </Subtitle>
    </section>
  )
}
