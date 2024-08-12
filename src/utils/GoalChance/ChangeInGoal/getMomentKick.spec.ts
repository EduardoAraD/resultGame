import { getMomentKick } from './getMomentKick'

const expectedGoal = 0.3
describe('Function getMomentKick', () => {
  afterAll(() => {
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  it('should be return some rebound kick moments', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.05)

    const { moments } = getMomentKick({
      minute: 90,
      homeOrAway: 'home',
      nameClub: 'Club Test',
      domain: {
        home: 80,
        away: 20,
      },
    })

    expect(moments[0]).toEqual(
      expect.objectContaining({
        narration: 'O jogador faz o chute',
      }),
    )
    expect(moments[1]).toEqual(
      expect.objectContaining({
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

  it('should be return some kick out moments', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.15)

    const { moments } = getMomentKick({
      minute: 90,
      homeOrAway: 'home',
      nameClub: 'Club Test',
      domain: {
        home: 80,
        away: 20,
      },
    })

    expect(moments.length).toBe(2)
    expect(moments).toEqual([
      expect.objectContaining({
        narration: 'O jogador faz o chute',
      }),
      expect.objectContaining({
        stats: expect.objectContaining({
          shotsOnGoal: 0,
          shotsOut: 1,
          shotsBlocked: 0,
          goal: 0,
          expectedGoal,
        }),
      }),
    ])
  })

  it('should be return some kick blocked moments', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.25)

    const { moments } = getMomentKick({
      minute: 90,
      homeOrAway: 'home',
      nameClub: 'Club Test',
      domain: {
        home: 80,
        away: 20,
      },
    })

    expect(moments.length).toBe(2)
    expect(moments).toEqual([
      expect.objectContaining({
        narration: 'O jogador faz o chute',
      }),
      expect.objectContaining({
        stats: expect.objectContaining({
          shotsOnGoal: 0,
          shotsOut: 0,
          shotsBlocked: 1,
          goal: 0,
          expectedGoal,
        }),
      }),
    ])
  })

  it('should be return a moment in short free', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.35)

    const { moments, proxChance } = getMomentKick({
      minute: 90,
      homeOrAway: 'home',
      nameClub: 'Club Test',
      domain: {
        home: 80,
        away: 20,
      },
    })

    expect(proxChance).toBe('SHORT FREE')
    expect(moments.length).toBe(2)
    expect(moments).toEqual([
      expect.objectContaining({
        narration: 'O jogador faz o chute',
      }),
      expect.objectContaining({
        narration: 'Falta marcada! O jogador foi derrubado na hora de chutar',
      }),
    ])
  })

  it('should be return a moments for defense and corner kick', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.55)

    const { moments, proxChance } = getMomentKick({
      minute: 90,
      homeOrAway: 'home',
      nameClub: 'Club Test',
      domain: {
        home: 80,
        away: 20,
      },
    })

    expect(proxChance).toBe('CORNER KICK')
    expect(moments.length).toBe(3)
    expect(moments).toEqual([
      expect.objectContaining({
        narration: 'O jogador faz o chute',
      }),
      expect.objectContaining({
        stats: expect.objectContaining({
          shotsOnGoal: 1,
          shotsOut: 0,
          shotsBlocked: 0,
          goal: 0,
          expectedGoal,
        }),
      }),
      expect.objectContaining({
        narration: 'É escanteio para o Club Test!',
      }),
    ])
  })

  it('should be return a moments for defense hold goolkeeper', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.7)

    const { moments, proxChance } = getMomentKick({
      minute: 90,
      homeOrAway: 'home',
      nameClub: 'Club Test',
      domain: {
        home: 80,
        away: 20,
      },
    })

    expect(proxChance).toBe('STANTARD')
    expect(moments.length).toBe(2)
    expect(moments).toEqual([
      expect.objectContaining({
        narration: 'O jogador faz o chute',
      }),
      expect.objectContaining({
        stats: expect.objectContaining({
          shotsOnGoal: 1,
          shotsOut: 0,
          shotsBlocked: 0,
          goal: 0,
          expectedGoal,
        }),
      }),
    ])
  })

  it('should be return a moments for goal of the club', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.9)

    const { moments, proxChance } = getMomentKick({
      minute: 90,
      homeOrAway: 'home',
      nameClub: 'Club Test',
      domain: {
        home: 80,
        away: 20,
      },
    })

    expect(proxChance).toBe('STANTARD')
    expect(moments.length).toBe(2)
    expect(moments).toEqual([
      expect.objectContaining({
        narration: 'O jogador faz o chute',
      }),
      expect.objectContaining({
        stats: expect.objectContaining({
          shotsOnGoal: 1,
          shotsOut: 0,
          shotsBlocked: 0,
          goal: 1,
          expectedGoal,
        }),
      }),
    ])
  })
})
