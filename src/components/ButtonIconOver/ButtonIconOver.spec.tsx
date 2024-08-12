import { render, screen } from '../../../__tests__/utils/customRender'
import { ButtonIconOver } from '.'
import shieldSvg from '../../assets/icons/shield.svg'

describe('Component: ButtonIconOver', () => {
  it('should be render buttonIconOver', () => {
    render(<ButtonIconOver icon={shieldSvg} />)

    const icon = screen.getByTestId('icon')
    expect(icon).not.toBeNull()
  })
})
