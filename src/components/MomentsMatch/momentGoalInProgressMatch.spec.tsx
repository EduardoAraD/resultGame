import { render, screen } from '../../../__tests__/utils/customRender'
import { MomentGoalInProgressMatch } from './momentGoalInProgressMatch'

describe('Component: MomentGame/MomentGoalInProgressMatch', () => {
  it('should be render moment to club home', () => {
    render(
      <MomentGoalInProgressMatch
        minute={31}
        goalClubAway={2}
        goalClubHome={1}
        homeOrAway="home"
      />,
    )

    expect(screen.getByText(/2/i)).toBeTruthy()
    expect(screen.getByText('1')).toBeTruthy()
    expect(screen.getByText('31')).toBeTruthy()
    expect(screen.getByText('GOOOOOLLL')).toBeTruthy()
  })

  it('should be render moment to club away', () => {
    render(
      <MomentGoalInProgressMatch
        minute={33}
        goalClubAway={2}
        goalClubHome={1}
        homeOrAway="away"
      />,
    )

    expect(screen.getByText('2')).toBeTruthy()
    expect(screen.getByText(/1/i)).toBeTruthy()
    expect(screen.getByText('33')).toBeTruthy()
    expect(screen.getByText('GOOOOOLLL')).toBeTruthy()
  })
})
