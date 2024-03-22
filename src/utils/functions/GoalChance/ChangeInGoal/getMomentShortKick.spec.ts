import { getMomentShortKick } from './getMomentShortKick'

const expectedGoal = 0.5
describe('Function getMomentShortKick', () => {
  afterAll(() => {
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  it('should be return a moments for goal of the club', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.223456789)

    const { moments, proxChance } = getMomentShortKick({
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
        narration: 'O jogador está na cara do gol, pronto para marcar!',
      }),
      expect.objectContaining({
        stats: expect.objectContaining({
          shotsOnGoal: 1,
          goal: 1,
          expectedGoal,
        }),
      }),
    ])
  })

  it('should be return a moments for penalty for club', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.423456789)

    const { moments, proxChance } = getMomentShortKick({
      minute: 90,
      homeOrAway: 'home',
      nameClub: 'Club Test',
      domain: {
        home: 80,
        away: 20,
      },
    })

    expect(proxChance).toBe('PENALTY')
    expect(moments.length).toBe(2)
    expect(moments).toEqual([
      expect.objectContaining({
        narration: 'O jogador está na cara do gol, pronto para marcar!',
      }),
      expect.objectContaining({
        narration: 'Penalti! O jogador foi derrubado na hora do chute',
      }),
    ])
  })

  it('should be return a moments no defense goalkeeper and corner kick', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.75)

    const { moments, proxChance } = getMomentShortKick({
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
        narration: 'O jogador está na cara do gol, pronto para marcar!',
      }),
      expect.objectContaining({
        stats: expect.objectContaining({
          shotsOnGoal: 1,
          expectedGoal,
        }),
      }),
      expect.objectContaining({
        narration: 'É escanteio para o Club Test!',
      }),
    ])
  })

  it('should be return some kick out moments', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.95)

    const { moments, proxChance } = getMomentShortKick({
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
        narration: 'O jogador está na cara do gol, pronto para marcar!',
      }),
      expect.objectContaining({
        stats: expect.objectContaining({
          shotsOut: 1,
          expectedGoal,
        }),
      }),
    ])
  })
})
