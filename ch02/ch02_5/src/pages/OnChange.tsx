import type {ChangeEvent} from 'react'
import {useState} from 'react'
import Select from 'react-select'

// npm i react-select

export default function OnChange() {
  const onChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation()
    event.preventDefault()
    console.log('onChangeValue', event.target.value)
  }
  const onChangeChecked = (event: ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation()
    event.preventDefault()
    console.log('onChangeChecked', event.target.checked)
  }
  const onChangeFiles = (event: ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation()
    event.preventDefault()
    console.log('onChangeFiles', event.target.files)
  }
  const options = [
    {value: 'front', label: '프론트엔드'},
    {value: 'back', label: '백엔드'},
    {value: 'full', label: '풀스택'}
  ]
  const [choice, setChoice] = useState('full')
  const handlePart = (event: any) => {
    setChoice(event.target.value)
    console.log(event.target.value)
    console.log(event.target.options[event.target.selectedIndex].text)
  }
  return (
    <div>
      <p>OnChange</p>
      {/* prettier-ignore */}
      <input type="text" name="" id="" onChange={onChangeValue} 
        placeholder="type some text"/>
      <input type="checkbox" onChange={onChangeChecked} defaultChecked />
      <input type="file" onChange={onChangeFiles} multiple accept="images/*" />
      <select name="" value={choice} onChange={handlePart}>
        {options.map((item, idx) => (
          <option value={item.value} key={idx}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  )
}
