import { CardMatchResult } from '.'
import {
  fireEvent,
  render,
  screen,
} from '../../../__tests__/utils/customRender'
import { emptyClub } from '../../Model/Club'
import { MatchStats } from '../../Model/Match'
import { emptyStats } from '../../Model/Stats'

describe('Component: CardMatchResult', () => {
  it('should be render match card in result', () => {
    const stats: MatchStats = {
      id: 'stats-01',
      type: 'standard',
      status: 'finished',
      homeStats: { ...emptyStats, goal: 2, goalPenalty: 3 },
      awayStats: { ...emptyStats, goal: 2, goalPenalty: 4 },
    }

    render(
      <CardMatchResult
        stadium="Name Stadium Test"
        home={{ ...emptyClub, name: 'Club Home' }}
        away={{ ...emptyClub, name: 'Club Away' }}
        stats={stats}
      />,
    )

    expect(screen.getByText('Name Stadium Test')).toBeTruthy()
    expect(screen.getByText('Club Home')).toBeTruthy()
    expect(screen.getByText('Club Away')).toBeTruthy()
    expect(screen.getByText('4')).toBeTruthy()
    expect(screen.getByText('3')).toBeTruthy()
    expect(screen.getAllByText('2')).toHaveLength(2)
  })

  it('should be render match in status start', () => {
    const stats: MatchStats = {
      id: 'stats-01',
      type: 'standard',
      status: 'start',
      homeStats: { ...emptyStats, goal: 2 },
      awayStats: { ...emptyStats, goal: 2 },
    }

    render(
      <CardMatchResult
        stadium="Name Stadium Test"
        home={{ ...emptyClub, name: 'Club Home' }}
        away={{ ...emptyClub, name: 'Club Away' }}
        stats={stats}
      />,
    )

    const cardMatch = screen.getByTestId('card')
    fireEvent.press(cardMatch)

    expect(screen.getByText('Name Stadium Test')).toBeTruthy()
    expect(screen.getByText('Club Home')).toBeTruthy()
    expect(screen.getByText('Club Away')).toBeTruthy()
    expect(screen.queryAllByText('2')).toHaveLength(0)
    expect(screen.queryByText('Posse de Bola')).toBeNull()
  })

  it('should be render stats if function actived', () => {
    const stats: MatchStats = {
      id: 'stats-01',
      type: 'standard',
      status: 'finished',
      homeStats: { ...emptyStats, goal: 2 },
      awayStats: { ...emptyStats, goal: 2 },
    }

    render(
      <CardMatchResult
        stadium="Name Stadium Test"
        home={{ ...emptyClub, name: 'Club Home' }}
        away={{ ...emptyClub, name: 'Club Away' }}
        stats={stats}
      />,
    )

    const cardMatch = screen.getByTestId('card')
    fireEvent.press(cardMatch)

    expect(screen.getByText('Name Stadium Test')).toBeTruthy()
    expect(screen.getByText('Club Home')).toBeTruthy()
    expect(screen.getByText('Club Away')).toBeTruthy()
    expect(screen.getByText('Posse de Bola')).toBeTruthy()
  })
})
