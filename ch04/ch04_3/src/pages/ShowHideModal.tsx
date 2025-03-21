import {useCallback} from 'react'
import {Title, Subtitle} from '../components'
import {Button, Modal, ModalContent, ModalAction} from '../theme/daisyui'
import {useToggle} from '../hooks'
import * as D from '../data'

export default function ShowHideModal() {
  const [open, toggleOpen] = useToggle(false) //[checked, toggleChecked]구조분해할당
  const onAccept = useCallback(() => {
    toggleOpen()
  }, [toggleOpen]) //의존성 목록에 값이 없어도 상관없음.
  // prettier-ignore
  return (
    <section className="mt-4">
      <Title>ShowHideModal</Title>
      <div className="flex justify-center p-4">
        <Button className="btn-primary" onClick={toggleOpen}>Open Modal</Button>
      </div>

      <Modal open={open} >
        <ModalContent closeIconClassName="btn-primary" onCloseIconClicked={toggleOpen}>
          <Subtitle>Modal</Subtitle>
          <p>{D.randomParagraphs()}</p>
          <ModalAction>
            <button className="btn btn-primary" onClick={onAccept}>Accept</button>
            <button className="btn" onClick={toggleOpen}>Close</button>
          </ModalAction>
        </ModalContent>
      </Modal>
    </section>
  )
}
