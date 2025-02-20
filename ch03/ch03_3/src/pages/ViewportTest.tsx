import {Title} from '../components'

export default function ViewportTest() {
  return (
    // w-4, h-4, mt-4, mb-4 계산은 --spacing 값이 4이기 때문에 곱하기할것!
    <section className="w-screen h-screen mt-4 bg-indigo-900">
      <Title className="text-white">ViewportTest</Title>
    </section>
  )
}
