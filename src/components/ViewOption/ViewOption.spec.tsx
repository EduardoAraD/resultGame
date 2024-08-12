import { Text } from 'react-native'
import { ViewOption } from '.'
import {
  fireEvent,
  render,
  screen,
} from '../../../__tests__/utils/customRender'

describe('Component: ViewOption', () => {
  it('should be render component', () => {
    const onPress = jest.fn()

    render(
      <ViewOption
        optionSelected="test1"
        options={['test1', 'test2']}
        onOptionSelected={onPress}
      >
        <Text>Testing children</Text>
      </ViewOption>,
    )

    expect(screen.getByText('Testing children')).toBeTruthy()
    expect(screen.getByText('test1')).toBeTruthy()
    expect(screen.getByText('test2')).toBeTruthy()
  })

  it('should be render function on handle touch', () => {
    const onPress = jest.fn()

    render(
      <ViewOption
        optionSelected="test1"
        options={['test1', 'test2']}
        onOptionSelected={onPress}
      >
        <Text>Testing children</Text>
      </ViewOption>,
    )

    const touch = screen.getByTestId('touch-test1')
    fireEvent.press(touch)

    expect(onPress).toHaveBeenCalled()
    expect(onPress).toHaveBeenCalledWith('test1')
  })
})
