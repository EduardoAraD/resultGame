import { render, screen } from '../../../__tests__/utils/customRender'
import { ItemStats } from '.'

describe('Component: ItemStats', () => {
  it('should be render item stats', () => {
    render(<ItemStats valueHome="2" valueAway="3" title="goals" />)

    expect(screen.getByText('goals')).toBeTruthy()
    expect(screen.getByText('2')).toBeTruthy()
    expect(screen.getByText('3')).toBeTruthy()
  })
})
