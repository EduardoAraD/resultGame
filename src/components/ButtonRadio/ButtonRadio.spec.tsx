import { render, screen } from '../../../__tests__/utils/customRender'
import { ButtonRadio } from '.'

describe('Component: ButtonRadio', () => {
  it('should be render selected in button radio', () => {
    render(<ButtonRadio selected />)

    const selectedIcon = screen.getByTestId('selected')
    expect(selectedIcon).toBeTruthy()
  })

  it('should be render not selected in button radio', () => {
    render(<ButtonRadio selected={false} />)

    const selectedIcon = screen.queryByTestId('selected')
    expect(selectedIcon).toBeNull()
  })
})
