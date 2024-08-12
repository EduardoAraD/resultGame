import { getMomentInAfterGoal } from './currentScoreboardMoment'

describe('Function getMomentInAfterGoal', () => {
  it('should be return one moment with scoreboard tied', () => {
    const moments = getMomentInAfterGoal({
      goalAway: 1,
      goalHome: 1,
      minute: 80,
      nameClub: 'Club Test',
      homeOrAway: 'home',
    })
    expect(moments).toEqual(
      expect.objectContaining({
        narration: 'E agora está tudo empatado. 1x1 no placar!',
      }),
    )
  })
  it('should be return the moment with the club winning for one goal', () => {
    const moments = getMomentInAfterGoal({
      goalAway: 0,
      goalHome: 1,
      minute: 80,
      nameClub: 'Club Test',
      homeOrAway: 'home',
    })
    expect(moments).toEqual(
      expect.objectContaining({
        narration: 'O Club Test está na frente. 1x0 no placar!',
      }),
    )
  })
  it('should be return the moment with the club winning for two goal', () => {
    const moments = getMomentInAfterGoal({
      goalAway: 0,
      goalHome: 2,
      minute: 80,
      nameClub: 'Club Test',
      homeOrAway: 'home',
    })
    expect(moments).toEqual(
      expect.objectContaining({
        narration: 'O Club Test aumenta a vantegem. 2x0 no placar!',
      }),
    )
  })
  it('should be return the moment with the club lossing for one goal', () => {
    const moments = getMomentInAfterGoal({
      goalAway: 1,
      goalHome: 2,
      minute: 80,
      nameClub: 'Club Test',
      homeOrAway: 'away',
    })
    expect(moments).toEqual(
      expect.objectContaining({
        narration: 'A ventagem cai para um gol. 2x1 no placar!',
      }),
    )
  })
  it('should be return of the moment with the club winning by more than two goals', () => {
    const moments = getMomentInAfterGoal({
      goalAway: 1,
      goalHome: 4,
      minute: 80,
      nameClub: 'Club Test',
      homeOrAway: 'home',
    })
    expect(moments).toEqual(
      expect.objectContaining({
        narration: 'Já é goleada. O Club Test faz 4x1 no placar!',
      }),
    )
  })
  it('should be return of the moment with the club lossing by more than one goals', () => {
    const moments = getMomentInAfterGoal({
      goalAway: 1,
      goalHome: 3,
      minute: 80,
      nameClub: 'Club Test',
      homeOrAway: 'away',
    })
    expect(moments).toEqual(
      expect.objectContaining({
        narration: 'O Club Test diminui. 3x1 no placar!',
      }),
    )
  })
})
