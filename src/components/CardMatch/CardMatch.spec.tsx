import { CardMatch } from '.'
import { render, screen } from '../../../__tests__/utils/customRender'
import { emptyClub } from '../../Model/Club'
import { MatchComplete } from '../../Model/Match'
import { emptyStats } from '../../Model/Stats'

describe('Component: CardMatch', () => {
  it('should be render match of status equal start and type equal standard', () => {
    const match: MatchComplete = {
      home: {
        ...emptyClub,
        name: 'Club Home',
      },
      away: {
        ...emptyClub,
        name: 'Club Away',
      },
      stats: {
        id: 'stats-01',
        type: 'standard',
        status: 'start',
        homeStats: emptyStats,
        awayStats: emptyStats,
      },
    }

    render(<CardMatch match={match} />)

    expect(screen.getByText('Club Home')).toBeTruthy()
    expect(screen.getByText('Club Away')).toBeTruthy()
    expect(screen.queryByText('0')).toBeNull()
  })

  it('should be render match in status equal finished and type equal standard', () => {
    const match: MatchComplete = {
      home: {
        ...emptyClub,
        name: 'Club Home',
      },
      away: {
        ...emptyClub,
        name: 'Club Away',
      },
      stats: {
        id: 'stats-01',
        type: 'standard',
        status: 'finished',
        homeStats: emptyStats,
        awayStats: emptyStats,
      },
    }

    render(<CardMatch match={match} />)

    expect(screen.getByText('Club Home')).toBeTruthy()
    expect(screen.getByText('Club Away')).toBeTruthy()
    expect(screen.getAllByText('0')).toHaveLength(2)
  })

  it('should be render match in status equal finished and type equal return game', () => {
    const match: MatchComplete = {
      home: {
        ...emptyClub,
        name: 'Club Home',
      },
      away: {
        ...emptyClub,
        name: 'Club Away',
      },
      stats: {
        id: 'stats-01',
        type: 'return game',
        status: 'finished',
        homeStats: emptyStats,
        awayStats: { ...emptyStats, goal: 1 },
      },
      statsTrip: {
        id: 'stats-02',
        type: 'one-way game',
        status: 'finished',
        homeStats: { ...emptyStats, goal: 1 },
        awayStats: emptyStats,
      },
    }

    render(<CardMatch match={match} />)

    expect(screen.getByText('Club Home')).toBeTruthy()
    expect(screen.getByText('Club Away')).toBeTruthy()
    expect(screen.getByText('2')).toBeTruthy()
    expect(screen.getAllByText('1')).toHaveLength(2)
    expect(screen.getAllByText('0')).toHaveLength(3)
  })

  it('should be render match in status equal finished with penalty', () => {
    const match: MatchComplete = {
      home: {
        ...emptyClub,
        name: 'Club Home',
      },
      away: {
        ...emptyClub,
        name: 'Club Away',
      },
      stats: {
        id: 'stats-01',
        type: 'knockout stage',
        status: 'finished',
        homeStats: { ...emptyStats, goalPenalty: 5 },
        awayStats: { ...emptyStats, goalPenalty: 4 },
      },
    }

    render(<CardMatch match={match} />)

    expect(screen.getByText('Club Home')).toBeTruthy()
    expect(screen.getByText('Club Away')).toBeTruthy()
    expect(screen.getAllByText('0')).toHaveLength(2)
    expect(screen.getByText('5')).toBeTruthy()
    expect(screen.getByText('4')).toBeTruthy()
  })
})
