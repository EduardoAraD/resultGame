import { ReactNode } from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import { SlideInDown, SlideOutDown } from 'react-native-reanimated'

import { Content, Modal, ViewContent } from './styles'

interface ModalBaseProps {
  children: ReactNode
  visible: boolean
  onClose(): void
}

export function ModalBase({ children, visible, onClose }: ModalBaseProps) {
  return (
    visible && (
      <Modal
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
        }}
        entering={SlideInDown}
        exiting={SlideOutDown}
      >
        <TouchableWithoutFeedback onPress={onClose}>
          <Content />
        </TouchableWithoutFeedback>
        <ViewContent>{children}</ViewContent>
      </Modal>
    )
  )
}
