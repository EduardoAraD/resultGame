import { ClubShort, emptyClub } from '../../Model/Club'
import { emptyMatchStats } from '../../Model/Match'
import { getSumScoreMatch } from './getSumScoreMatch'

describe('Utils SumStatsMatch', () => {
  it('should be return an sum in stats', () => {
    const clubHome: ClubShort = { ...emptyClub, name: 'Club Home' }
    const clubAway: ClubShort = { ...emptyClub, name: 'Club Away' }

    const { stats } = getSumScoreMatch({
      match: {
        home: clubHome,
        away: clubAway,
        stats: {
          ...emptyMatchStats,
          homeStats: { ...emptyMatchStats.homeStats, goal: 1 },
          awayStats: { ...emptyMatchStats.awayStats, goal: 0 },
        },
        statsTrip: {
          ...emptyMatchStats,
          homeStats: { ...emptyMatchStats.homeStats, goal: 1 },
          awayStats: { ...emptyMatchStats.awayStats, goal: 2 },
        },
      },
    })

    expect(stats.homeStats.goal).toBe(3)
    expect(stats.awayStats.goal).toBe(1)
  })
})
