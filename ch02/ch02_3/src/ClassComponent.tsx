import {Component} from 'react'

// 사용자 컴포넌트 중 클래스 컴포넌트 :: 속성이 없는 경우
/*export default class ClassComponent extends Component {
  render() {
    return (
      <li>
        <a href="https://www.meta.com">
          <p>Meta</p>
        </a>
      </li>
    )
  }
}*/

// 사용자 컴포넌트 중 클래스 컴포넌트 :: 속성이 있는 경우
export type ClassComponentProps = {
  href: string
  text: string
}
export default class ClassComponent extends Component<ClassComponentProps> {
  render() {
    // 속성의 역할 :: 정보전달, 리렌더링
    const {href, text, ...rest} = this.props
    return (
      <li>
        <a href={href}>
          <p>{text}</p>
        </a>
      </li>
    )
  }
}
