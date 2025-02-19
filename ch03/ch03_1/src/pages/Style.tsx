export default function Style() {
  return (
    <div>
      <p>Style</p>
      <span
        className="material-symbols-outlined"
        style={{color: 'green', fontSize: '50px'}}>
        code
      </span>
      <span style={{background: 'yellowgreen'}}>
        직접 태그에 style을 적용하는 방식을 인라인 스타일링{' '}
      </span>
      <span
        className="material-symbols-outlined"
        style={{color: 'green', fontSize: '50px'}}>
        code_off
      </span>
    </div>
  )
}
