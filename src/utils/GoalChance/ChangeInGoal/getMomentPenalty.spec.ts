import { getMomentPenaltKick } from './getMomentPenalty'

const expectedGoal = 0.8
describe('Function getMomentPenaltKick', () => {
  afterAll(() => {
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  it('should be return a moments for rebound kick', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.05)

    const { moments } = getMomentPenaltKick({
      minute: 90,
      homeOrAway: 'home',
      nameClub: 'Club Test',
      domain: {
        home: 50,
        away: 50,
      },
    })

    expect(moments.length).toBeGreaterThan(3)
    expect(moments[0]).toEqual(
      expect.objectContaining({
        narration: 'O jogador se prepara para cobrar o penalti.',
      }),
    )
    expect(moments[1]).toEqual(
      expect.objectContaining({
        narration: 'O goleiro espalma para o meio da área',
        stats: expect.objectContaining({
          shotsOnGoal: 1,
          shotsOut: 0,
          shotsBlocked: 0,
          goal: 0,
          expectedGoal,
        }),
      }),
    )
    expect(moments[2]).toEqual(
      expect.objectContaining({
        narration: 'A bola sobra para o atacante.',
      }),
    )
  })

  it('should be return some shouts out moment', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.15)

    const { moments } = getMomentPenaltKick({
      minute: 90,
      homeOrAway: 'away',
      nameClub: 'Club Test',
      domain: {
        home: 50,
        away: 50,
      },
    })

    expect(moments.length).toBe(2)
    expect(moments).toEqual([
      expect.objectContaining({
        narration: 'O jogador se prepara para cobrar o penalti.',
      }),
      expect.objectContaining({
        stats: expect.objectContaining({
          shotsOut: 1,
          shotsOnGoal: 0,
          shotsBlocked: 0,
          goal: 0,
          expectedGoal,
        }),
      }),
    ])
  })

  it('should be return a moment defense goalkeeper', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.29)

    const { moments } = getMomentPenaltKick({
      minute: 90,
      homeOrAway: 'away',
      nameClub: 'Club Test',
      domain: {
        home: 50,
        away: 50,
      },
    })

    expect(moments.length).toBe(2)
    expect(moments).toEqual([
      expect.objectContaining({
        narration: 'O jogador se prepara para cobrar o penalti.',
      }),
      expect.objectContaining({
        stats: expect.objectContaining({
          shotsOut: 0,
          shotsOnGoal: 1,
          shotsBlocked: 0,
          goal: 0,
          expectedGoal,
        }),
      }),
    ])
  })

  it('should be return a moments for goal of the club', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.5)

    const { moments } = getMomentPenaltKick({
      minute: 90,
      homeOrAway: 'away',
      nameClub: 'Club Test',
      domain: {
        home: 50,
        away: 50,
      },
    })

    expect(moments.length).toBe(2)
    expect(moments).toEqual([
      expect.objectContaining({
        narration: 'O jogador se prepara para cobrar o penalti.',
      }),
      expect.objectContaining({
        stats: expect.objectContaining({
          shotsOut: 0,
          shotsOnGoal: 1,
          shotsBlocked: 0,
          goal: 1,
          expectedGoal,
        }),
      }),
    ])
  })
})
