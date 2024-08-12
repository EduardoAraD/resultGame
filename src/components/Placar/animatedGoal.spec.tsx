import { render, screen } from '../../../__tests__/utils/customRender'
import { GoalAnimated } from './animatedGoal'

describe('Component: Score/GoalAnimate', () => {
  it('should be render component', () => {
    render(<GoalAnimated />)

    expect(screen.getByText('G')).toBeTruthy()
    expect(screen.getAllByText('O')).toHaveLength(3)
    expect(screen.getAllByText('L')).toHaveLength(1)
  })
})
