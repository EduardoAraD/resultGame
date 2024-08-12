import { Input } from '.'
import {
  fireEvent,
  render,
  screen,
} from '../../../__tests__/utils/customRender'

describe('Component: Input', () => {
  it('should be render component', () => {
    render(<Input placeholder="test input" />)

    expect(screen.getByPlaceholderText('test input')).toBeTruthy()
  })

  it('should be render input invalid', () => {
    render(<Input placeholder="test input" invalid />)

    const input = screen.getByTestId('input')
    fireEvent.press(input)

    expect(screen.getByPlaceholderText('test input')).toBeTruthy()
  })
})
