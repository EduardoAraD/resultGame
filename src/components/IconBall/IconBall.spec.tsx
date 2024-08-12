import { IconBall } from '.'
import { render, screen } from '../../../__tests__/utils/customRender'

describe('Component: IconBall', () => {
  it('should be render in checked is true', () => {
    render(<IconBall checked />)

    expect(screen.getByTestId('check')).toBeTruthy()
    expect(screen.queryByTestId('x')).toBeNull()
  })

  it('should be render in checked is false', () => {
    render(<IconBall checked={false} />)

    expect(screen.queryByTestId('check')).toBeNull()
    expect(screen.getByTestId('x')).toBeTruthy()
  })
})
