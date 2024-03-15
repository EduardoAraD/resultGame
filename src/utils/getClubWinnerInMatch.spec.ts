import { emptyStats } from '../Model/Stats'
import { getWinnerClubInTwoMatch } from './getClubWinnerInMatch'

describe('Function getWinnerClubInTwoMatch', () => {
  it('should be reponse the winner is home by goals', () => {
    const winnerClubId = getWinnerClubInTwoMatch({
      matchStatsHomeVsAway: {
        id: '',
        type: 'knockout stage',
        status: 'finished',
        homeStats: { ...emptyStats, goal: 1 },
        awayStats: emptyStats,
      },
      homeClubId: '1',
      awayClubId: '2',
    })

    expect(winnerClubId).toBe('1')
  })
  it('should be reponse the winner is away by goals', () => {
    const winnerClubId = getWinnerClubInTwoMatch({
      matchStatsHomeVsAway: {
        id: '',
        type: 'knockout stage',
        status: 'finished',
        homeStats: { ...emptyStats, goal: 1 },
        awayStats: { ...emptyStats, goal: 1 },
      },
      matchStatsTripAwayVsHome: {
        id: '',
        type: 'knockout stage',
        status: 'finished',
        homeStats: { ...emptyStats, goal: 1 },
        awayStats: { ...emptyStats, goal: 0 },
      },
      homeClubId: '1',
      awayClubId: '2',
    })

    expect(winnerClubId).toBe('2')
  })
  it('should be reponse the winner is home by goals Penalties', () => {
    const winnerClubId = getWinnerClubInTwoMatch({
      matchStatsHomeVsAway: {
        id: '',
        type: 'knockout stage',
        status: 'finished',
        homeStats: { ...emptyStats, goal: 1, goalPenalty: 3 },
        awayStats: { ...emptyStats, goal: 2, goalPenalty: 2 },
      },
      matchStatsTripAwayVsHome: {
        id: '',
        type: 'knockout stage',
        status: 'finished',
        homeStats: { ...emptyStats, goal: 1 },
        awayStats: { ...emptyStats, goal: 2 },
      },
      homeClubId: '1',
      awayClubId: '2',
    })

    expect(winnerClubId).toBe('1')
  })
  it('should be reponse the winner is away by goals Penalties', () => {
    const winnerClubId = getWinnerClubInTwoMatch({
      matchStatsHomeVsAway: {
        id: '',
        type: 'knockout stage',
        status: 'finished',
        homeStats: { ...emptyStats, goal: 1, goalPenalty: 3 },
        awayStats: { ...emptyStats, goal: 2, goalPenalty: 4 },
      },
      matchStatsTripAwayVsHome: {
        id: '',
        type: 'knockout stage',
        status: 'finished',
        homeStats: { ...emptyStats, goal: 0 },
        awayStats: { ...emptyStats, goal: 1 },
      },
      homeClubId: '1',
      awayClubId: '2',
    })

    expect(winnerClubId).toBe('2')
  })
})
