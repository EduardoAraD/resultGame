import { getMomentLongFreeKick } from './getMomentLongFreeKick'

const expectedGoal = 0.1
describe('Function getMomentLongFreeKick', () => {
  afterAll(() => {
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  it('should be return a moment of defense hold goalkeeper', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.04)

    const { moments, proxChance } = getMomentLongFreeKick({
      minute: 90,
      homeOrAway: 'home',
      nameClub: 'Club Test',
      domain: {
        home: 50,
        away: 50,
      },
    })

    expect(proxChance).toBe('STANTARD')
    expect(moments.length).toBe(3)
    expect(moments).toEqual([
      expect.objectContaining({
        narration:
          'O Club Test se prepara para bater a falta de longa distância',
      }),
      expect.objectContaining({
        narration: 'O jogador vai bater direto.',
      }),
      expect.objectContaining({
        stats: expect.objectContaining({
          expectedGoal,
          goal: 0,
          shotsOnGoal: 1,
          shotsOut: 0,
          shotsBlocked: 0,
        }),
      }),
    ])
  })

  it('should be return a moment for great goal for the club', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.08)

    const { moments, proxChance } = getMomentLongFreeKick({
      minute: 90,
      homeOrAway: 'home',
      nameClub: 'Club Test',
      domain: {
        home: 50,
        away: 50,
      },
    })

    expect(proxChance).toBe('STANTARD')
    expect(moments.length).toBe(3)
    expect(moments).toEqual([
      expect.objectContaining({
        narration:
          'O Club Test se prepara para bater a falta de longa distância',
      }),
      expect.objectContaining({
        narration: 'O jogador vai bater direto.',
      }),
      expect.objectContaining({
        stats: expect.objectContaining({
          expectedGoal,
          goal: 1,
          shotsOnGoal: 1,
          shotsOut: 0,
          shotsBlocked: 0,
        }),
      }),
    ])
  })

  it('should be return some shots out moment', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.25)

    const { moments, proxChance } = getMomentLongFreeKick({
      minute: 90,
      homeOrAway: 'away',
      nameClub: 'Club Test',
      domain: {
        home: 50,
        away: 50,
      },
    })

    expect(proxChance).toBe('STANTARD')
    expect(moments.length).toBe(3)
    expect(moments).toEqual([
      expect.objectContaining({
        narration:
          'O Club Test se prepara para bater a falta de longa distância',
      }),
      expect.objectContaining({
        narration: 'O jogador vai bater direto.',
      }),
      expect.objectContaining({
        stats: expect.objectContaining({
          expectedGoal,
          goal: 0,
          shotsOnGoal: 0,
          shotsOut: 1,
          shotsBlocked: 0,
        }),
      }),
    ])
  })

  it('should be return a moment of long crossing', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.6)

    const { moments } = getMomentLongFreeKick({
      minute: 90,
      homeOrAway: 'away',
      nameClub: 'Club Test',
      domain: {
        home: 50,
        away: 50,
      },
    })

    expect(moments[0]).toEqual(
      expect.objectContaining({
        narration:
          'O Club Test se prepara para bater a falta de longa distância',
      }),
    )
    expect(moments[1]).toEqual(
      expect.objectContaining({
        narration: 'O jogador vai mandar a bola na área.',
      }),
    )
    expect(moments[2]).toEqual(
      expect.objectContaining({
        narration: 'O Club Test faz o cruzamento na primeira trave.',
      }),
    )
  })
})
