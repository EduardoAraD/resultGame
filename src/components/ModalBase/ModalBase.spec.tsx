import { Text } from 'react-native'
import {
  fireEvent,
  render,
  screen,
} from '../../../__tests__/utils/customRender'

import { ModalBase } from '.'

describe('Component: ModalBase', () => {
  it('should be render modal visible', () => {
    const onClose = jest.fn()
    render(
      <ModalBase visible onClose={onClose}>
        <Text>testing</Text>
      </ModalBase>,
    )

    expect(screen.getByText('testing')).toBeTruthy()
  })

  it('should be render press onClose', () => {
    const onClose = jest.fn()

    render(
      <ModalBase visible onClose={onClose}>
        <Text>testing</Text>
      </ModalBase>,
    )

    const touchFeedback = screen.getByTestId('touchFeedback')
    fireEvent.press(touchFeedback)

    expect(onClose).toHaveBeenCalled()
  })

  it('should be render modal invisible', () => {
    const onClose = jest.fn()

    render(
      <ModalBase visible={false} onClose={onClose}>
        <Text>testing</Text>
      </ModalBase>,
    )

    expect(screen.queryByText('testing')).toBeNull()
  })
})
