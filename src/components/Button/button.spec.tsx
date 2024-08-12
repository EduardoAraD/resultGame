import { screen } from '@testing-library/react-native'
import { render } from '../../../__tests__/utils/customRender'
import { Button } from '.'

describe('Component: Button', () => {
  it('should be render background', () => {
    render(<Button title="Test" />)

    expect(screen.getByText('Test')).toBeTruthy()
  })

  it('should be render color PRIMARY', () => {
    render(<Button title="Test" type="Primary" />)

    expect(screen.getByText('Test')).toBeTruthy()
  })

  it('should be render color SECUNDARY', () => {
    render(<Button title="Test" type="Secundary" />)

    expect(screen.getByText('Test')).toBeTruthy()
  })

  it('should be render color CANCEL', () => {
    render(<Button title="Test" type="Cancel" />)

    expect(screen.getByText('Test')).toBeTruthy()
  })

  it('should be render loading in color type PRIMARY', () => {
    render(<Button title="Test" loading />)

    const loading = screen.getByTestId('loading')
    expect(loading).toBeTruthy()
  })

  it('should be render color PRIMARY', () => {
    render(<Button title="Test" type="Secundary" loading />)

    const loading = screen.getByTestId('loading')
    expect(loading).toBeTruthy()
  })

  it('should be render desabled button', () => {
    render(<Button title="Test" disabled />)

    expect(screen.getByText('Test')).toBeTruthy()
  })
})
