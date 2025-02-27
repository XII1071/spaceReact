import {useContext} from 'react'
import {Title, Subtitle} from '../components'
import {ResponsiveContext, useResponsive} from '../contexts'

export default function ResponsiveContextTest() {
  // const breakpoint = useResponsive()
  const {breakpoint} = useContext(ResponsiveContext)
  return (
    <section className="mt-4">
      <Title>ResponsiveContextTest</Title>
      <div className="mt-4">
        <Subtitle>breakpoint: {breakpoint}</Subtitle>
      </div>
    </section>
  )
}
