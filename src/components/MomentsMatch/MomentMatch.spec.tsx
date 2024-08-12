import { MomentsMatch } from '.'
import { render, screen } from '../../../__tests__/utils/customRender'
import { MomentComplete } from '../../Model/Moment'
import { emptyStats } from '../../Model/Stats'

describe('Component: MomentsGame', () => {
  it('should be render moment to start match', () => {
    const moments: MomentComplete[] = [
      {
        minute: 1,
        domainHome: 50,
        domainAway: 50,
        id: 1,
        homeOrAway: 'game',
        narration: '',
        stats: emptyStats,
      },
    ]

    render(<MomentsMatch moments={moments} />)

    const list = screen.getByTestId('list')

    expect(list.children).toHaveLength(1)
    expect(screen.getByText('Início de Jogo'))
  })

  it('should be render moment to interval match', () => {
    const moments: MomentComplete[] = [
      {
        minute: 45,
        domainHome: 50,
        domainAway: 50,
        id: 1,
        homeOrAway: 'game',
        narration: '',
        stats: emptyStats,
      },
    ]

    render(<MomentsMatch moments={moments} />)

    const list = screen.getByTestId('list')

    expect(list.children).toHaveLength(1)
    expect(screen.getByText('Intervalo'))
  })

  it('should be render moment to end match', () => {
    const moments: MomentComplete[] = [
      {
        minute: 90,
        domainHome: 50,
        domainAway: 50,
        id: 1,
        homeOrAway: 'game',
        narration: 'Final de Jogo',
        stats: emptyStats,
      },
    ]

    render(<MomentsMatch moments={moments} />)

    const list = screen.getByTestId('list')

    expect(list.children).toHaveLength(1)
    expect(screen.getByText('Final de Jogo'))
  })

  it('should be render moment to goals in match', () => {
    const moments: MomentComplete[] = [
      {
        minute: 32,
        domainHome: 85,
        domainAway: 15,
        id: 1,
        homeOrAway: 'home',
        narration: 'Goool do Club Hom',
        stats: { ...emptyStats, goal: 1 },
      },
      {
        minute: 68,
        domainHome: 85,
        domainAway: 15,
        id: 2,
        homeOrAway: 'away',
        narration: 'Goool do Club Away',
        stats: { ...emptyStats, goal: 1 },
      },
    ]

    render(<MomentsMatch moments={moments} />)

    const list = screen.getByTestId('list')

    expect(list.children).toHaveLength(2)
    expect(screen.getAllByText('GOOOOOLLL')).toHaveLength(2)
  })

  it('should be render moment to goals in match', () => {
    const moments: MomentComplete[] = [
      {
        minute: 32,
        domainHome: 85,
        domainAway: 15,
        id: 1,
        homeOrAway: 'home',
        narration: 'Goool do Club Hom',
        stats: { ...emptyStats, goal: 1 },
        isPenaltyShots: true,
      },
      {
        minute: 68,
        domainHome: 85,
        domainAway: 15,
        id: 2,
        homeOrAway: 'away',
        narration: 'Goool do Club Away',
        stats: { ...emptyStats, goal: 1 },
        isPenaltyShots: true,
      },
    ]

    render(<MomentsMatch moments={moments} />)

    const list = screen.getByTestId('list')

    expect(list.children).toHaveLength(2)
    expect(screen.getAllByText(/Goool do Club/i)).toHaveLength(2)
  })
})
