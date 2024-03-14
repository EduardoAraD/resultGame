import { emptyStats } from './Stats'

describe('Model Stats', () => {
  it('should be un object Stats with values initials', () => {
    expect(emptyStats.expectedGoal).toEqual(0)
    expect(emptyStats.goal).toEqual(0)
    expect(emptyStats.goalPenalty).toEqual(0)
    expect(emptyStats.numberPenalties).toEqual(0)
    expect(emptyStats.possession).toEqual(0)
    expect(emptyStats.shotsBlocked).toEqual(0)
    expect(emptyStats.shotsOnGoal).toEqual(0)
    expect(emptyStats.shotsOut).toEqual(0)
  })
})
