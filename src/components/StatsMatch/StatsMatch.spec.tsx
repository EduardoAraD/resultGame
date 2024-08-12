import { StatsMatch } from '.'
import { render, screen } from '../../../__tests__/utils/customRender'
import { emptyStats } from '../../Model/Stats'
import { logoClubDefault } from '../../utils/getDefaultLogoClub'

describe('Component: StatsMatch', () => {
  it('should be render stats of match', () => {
    render(
      <StatsMatch
        hasPenalt
        homeInfo={{
          logo: logoClubDefault,
          stats: {
            goal: 2,
            goalPenalty: 9,
            shotsOnGoal: 5,
            shotsBlocked: 6,
            shotsOut: 7,
            possession: 60,
            expectedGoal: 3.4,
            numberPenalties: 10,
          },
        }}
        awayInfo={{
          logo: logoClubDefault,
          stats: {
            goal: 2,
            goalPenalty: 8,
            shotsOnGoal: 2,
            shotsBlocked: 3,
            shotsOut: 4,
            possession: 40,
            expectedGoal: 1.4,
            numberPenalties: 10,
          },
        }}
      />,
    )

    expect(screen.getAllByText('2')).toHaveLength(3)
    expect(screen.getByText('60.0%')).toBeTruthy()
    expect(screen.getByText('8')).toBeTruthy()
  })

  it('should be render stats of match without logos', () => {
    render(
      <StatsMatch
        hasPenalt
        showLogos={false}
        homeInfo={{
          logo: logoClubDefault,
          stats: emptyStats,
        }}
        awayInfo={{
          logo: logoClubDefault,
          stats: emptyStats,
        }}
      />,
    )

    const divLogos = screen.queryByTestId('logos')
    expect(divLogos).toBeNull()
  })

  it('should be render stats of match without stats of the goals', () => {
    render(
      <StatsMatch
        hasPenalt={false}
        showGoal={false}
        homeInfo={{
          logo: logoClubDefault,
          stats: emptyStats,
        }}
        awayInfo={{
          logo: logoClubDefault,
          stats: emptyStats,
        }}
      />,
    )

    expect(screen.queryByText('Gols')).toBeNull()
  })
})
