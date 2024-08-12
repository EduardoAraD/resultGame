import { render, screen } from '../../../__tests__/utils/customRender'
import { EmptyList } from '.'

describe('Component: EmptyList', () => {
  it('should be render component', () => {
    render(<EmptyList message="empty list" />)

    expect(screen.getByText('empty list')).toBeTruthy()
  })
})
