import { emptyMatchStats } from './Match'

describe('Model Match', () => {
  it('should be un object MatchStats with values initials', () => {
    expect(emptyMatchStats.id).toEqual('')
    expect(emptyMatchStats.status).toEqual('start')
    expect(emptyMatchStats.type).toEqual('standard')
    expect(emptyMatchStats.homeStats).toEqual(
      expect.objectContaining({ goal: 0 }),
    )
    expect(emptyMatchStats.awayStats).toEqual(
      expect.objectContaining({ goal: 0 }),
    )
  })
})
