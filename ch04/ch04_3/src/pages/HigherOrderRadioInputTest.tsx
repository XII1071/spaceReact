import {useMemo, useCallback, useState} from 'react'
import {Title, Subtitle} from '../components'
import * as D from '../data'

export default function HigherOrderRadioInputTest() {
  const jobTitles = useMemo(() => D.makeArray(4).map(D.randomJobTitle), [])

  const [selectedIndex, setSelectedIndex] = useState<number>(0)

  const onChange = useCallback(
    // 고차함수 사용 이유: useCallback의 함수는 ()=>{} 형태이기 때문에
    // 일반함수를 먼저사용하여 원하는 값을 전달하고 리턴되는 함수를 ()=>{} 형태로 정의함.
    // (index: number) => () => setSelectedIndex(notUsed=>index),[])
    (index: number) => () => {
      console.log('selected:', jobTitles[index], index)
      return setSelectedIndex(notUsed => index)
    },
    [selectedIndex]
  )
  const radioInputs = useMemo(
    () =>
      jobTitles.map((value, index) => (
        <label key={index} className="flex justify-start cursor-pointer label">
          <input
            type="radio"
            name="higherJobs"
            className="mr-4 radio radio-primary"
            checked={index === selectedIndex}
            defaultValue={value}
            onChange={onChange(index)}
          />
          <span className="label-text">{value}</span>
        </label>
      )),
    [jobTitles, selectedIndex]
  )

  return (
    <section className="mt-4">
      <Title>RadioInputTest</Title>
      <div className="flex flex-col justify-center mt-4">
        <Subtitle>What is your job?</Subtitle>
        <Subtitle className="mt-4">Selected Job: {jobTitles[selectedIndex]} </Subtitle>
        <div className="flex justify-center p-4 mt-4">
          <div className="flex flex-col mt-4">{radioInputs}</div>
        </div>
      </div>
    </section>
  )
}
