export default function Style() {
  return (
    <div>
      <h4>Style</h4>
      <span
        className="material-symbols-outlined"
        style={{color: 'pink', fontSize: '50px'}}>
        favorite
      </span>
      <span style={{backgroundColor: 'yellowgreen'}}>
        직접 태그에 style을 적용하는 방식을 인라인 스타일링
      </span>
    </div>
  )
}
