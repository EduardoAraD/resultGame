import { render, screen } from '../../../__tests__/utils/customRender'
import { MomentGoalPenalty } from './momentGoalPenalty'

describe('Component: MomentGame/MomentGoalPenalty', () => {
  it('should be render moment to club home', () => {
    render(
      <MomentGoalPenalty
        narration="testing narration"
        isGoal
        goalClubAway={2}
        goalClubHome={1}
        homeOrAway="home"
      />,
    )

    expect(screen.getByText(/2/i)).toBeTruthy()
    expect(screen.getByText('1')).toBeTruthy()
    expect(screen.getByText('testing narration')).toBeTruthy()
  })

  it('should be render moment to club away', () => {
    render(
      <MomentGoalPenalty
        narration="testing narration"
        isGoal={false}
        goalClubAway={2}
        goalClubHome={1}
        homeOrAway="away"
      />,
    )

    expect(screen.getByText('2')).toBeTruthy()
    expect(screen.getByText(/1/i)).toBeTruthy()
    expect(screen.getByText('testing narration')).toBeTruthy()
  })
})
