import './App.css'
import P from './P'

function App() {
  // const texts = [<p>hello</p>, <p>world</p>]

  // const texts = [<p key={1}>hello</p>, <p key={2}>world</p>]

  // prettier-ignore
  // const texts = ['hello', 'world']
  //     .map((item, index) => <p key={index}>{item}</p>)

  // prettier-ignore
  // const texts = ['hello', 'world']
  //     .map((item, index) => <p key={index} children={item}></p>)

  // children 속성에 대하여
  // 1) 다양한 값을 가질 수 있다.(태그, 문자열, 숫자, 등등 null도 포함)
  // - children 속성의 타입은 값을 설정하지 않아도 되는 선택 속성
  // - React는 컴포넌트의 자식으로 무엇이든지 사용할 수 있도록 설계
  // 2) 부모 컴포넌트 내부에서 자식 컴포넌트 정보에 접근(전달)할 때 사용
  // - div 태그 처럼 자식 요소를 포함할 수 있는 컴포넌트에서만 사용
  // - 자식 컴포넌트가 없는 경우는 값이 하위노드에 텍스트 형태로 전달.
  // - React의 강력한 합성(Composition) 모델을 구현

  // <P>의 children은 하위 태그로 전달하며 이때 하위 태그가 없으면 걍 텍스트로 전달
  const texts = ['hello', 'world']
      .map((item, index) => <P key={index} children={item}></P>)

  return <div children={texts} />
}

export default App
