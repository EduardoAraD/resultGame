import { getMomentGreatGoal } from './getMomentGreatGoal'

describe('Function getMomentGreatGoal', () => {
  it('should be return one moment on goal', () => {
    const moment = getMomentGreatGoal({
      minute: 90,
      nameClub: 'Club Test',
      homeOrAway: 'home',
      expectedGoal: 0.5,
      domain: { away: 20, home: 80 },
    })
    expect(moment).toEqual(
      expect.objectContaining({
        narration: 'Goooooooolaço do Club Test.',
        homeOrAway: 'home',
        minute: 90,
        stats: expect.objectContaining({
          expectedGoal: 0.5,
          goal: 1,
          shotsOnGoal: 1,
        }),
      }),
    )
  })
})
