import { getSumStats } from './getSumStats'

describe('Utils SumStatsMatch/getSumStats', () => {
  it('should be return an sum in stats', () => {
    const { sumStats } = getSumStats({
      stats: {
        goal: 1,
        shotsBlocked: 3,
        shotsOnGoal: 3,
        shotsOut: 3,
        expectedGoal: 1.2,
        possession: 1,
        numberPenalties: 0,
        goalPenalty: 0,
      },
      statsTrip: {
        goal: 1,
        shotsBlocked: 1,
        shotsOnGoal: 2,
        shotsOut: 6,
        expectedGoal: 0.4,
        possession: 46,
        numberPenalties: 5,
        goalPenalty: 3,
      },
    })
    expect(sumStats).toEqual({
      goal: 2,
      shotsBlocked: 4,
      shotsOnGoal: 5,
      shotsOut: 9,
      expectedGoal: 1.6,
      possession: 47,
      numberPenalties: 5,
      goalPenalty: 3,
    })
  })
})
