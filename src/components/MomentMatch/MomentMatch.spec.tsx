import { render, screen } from '../../../__tests__/utils/customRender'
import { MomentMatch } from '.'
import { logoClubDefault } from '../../utils/getDefaultLogoClub'

describe('Component: MomentMatch', () => {
  it('should be render component with moment', () => {
    render(
      <MomentMatch
        minute={31}
        narration="testing narration"
        logo={logoClubDefault}
      />,
    )

    expect(screen.getByText('testing narration')).toBeTruthy()
    expect(screen.getByText('31')).toBeTruthy()
    expect(screen.queryByTestId('logo')).toBeNull()
  })

  it('should be render component with moment of goal', () => {
    render(
      <MomentMatch
        minute={31}
        narration="testing narration"
        logo={logoClubDefault}
        isGoal
      />,
    )

    expect(screen.getByText('testing narration')).toBeTruthy()
    expect(screen.getByText('31')).toBeTruthy()
    expect(screen.getByTestId('logo')).toBeTruthy()
  })
})
