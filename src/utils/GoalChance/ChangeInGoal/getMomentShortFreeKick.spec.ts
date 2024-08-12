import { getMomentShortFreeKick } from './getMomentShortFreeKick'

const expectedGoal = 0.3
describe('Function getMomentShortKick', () => {
  afterAll(() => {
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  it('should be return a moments for goal of the club', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.15)

    const { moments, proxChance } = getMomentShortFreeKick({
      minute: 90,
      homeOrAway: 'away',
      nameClub: 'Club Test',
      domain: {
        home: 80,
        away: 20,
      },
    })

    expect(proxChance).toBe('STANTARD')
    expect(moments.length).toBe(3)
    expect(moments).toEqual([
      expect.objectContaining({
        narration:
          'O Club Test se prepara para bater a falta próximo a grande área.',
      }),
      expect.objectContaining({
        narration: 'A bola passa pela barreira.',
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

  it('should be return a moments for defense goalkeeper and corner kick', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.33)

    const { moments, proxChance } = getMomentShortFreeKick({
      minute: 90,
      homeOrAway: 'home',
      nameClub: 'Club Test',
      domain: {
        home: 80,
        away: 20,
      },
    })

    expect(proxChance).toBe('CORNER KICK')
    expect(moments.length).toBe(4)
    expect(moments).toEqual([
      expect.objectContaining({
        narration:
          'O Club Test se prepara para bater a falta próximo a grande área.',
      }),
      expect.objectContaining({
        narration: 'A bola passa pela barreira.',
      }),
      expect.objectContaining({
        stats: expect.objectContaining({
          shotsOnGoal: 1,
          goal: 0,
          expectedGoal,
        }),
      }),
      expect.objectContaining({
        narration: 'É escanteio para o Club Test!',
      }),
    ])
  })

  it('should be return some kick out moments', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.55)

    const { moments, proxChance } = getMomentShortFreeKick({
      minute: 90,
      homeOrAway: 'home',
      nameClub: 'Club Test',
      domain: {
        home: 80,
        away: 20,
      },
    })

    expect(proxChance).toBe('STANTARD')
    expect(moments.length).toBe(3)
    expect(moments).toEqual([
      expect.objectContaining({
        narration:
          'O Club Test se prepara para bater a falta próximo a grande área.',
      }),
      expect.objectContaining({
        narration: 'A bola passa pela barreira.',
      }),
      expect.objectContaining({
        stats: expect.objectContaining({
          shotsOut: 1,
          goal: 0,
          expectedGoal,
        }),
      }),
    ])
  })

  it('should be return some moments of free kick against the wall with a corner', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.8)

    const { moments, proxChance } = getMomentShortFreeKick({
      minute: 90,
      homeOrAway: 'away',
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
        narration:
          'O Club Test se prepara para bater a falta próximo a grande área.',
      }),
      expect.objectContaining({
        narration: 'Bate na barreira e sai para linha de fundo',
      }),
      expect.objectContaining({
        narration: 'É escanteio para o Club Test!',
      }),
    ])
  })

  it('should be return some moments of free kick against the wall', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.9)

    const { moments, proxChance } = getMomentShortFreeKick({
      minute: 90,
      homeOrAway: 'away',
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
        narration:
          'O Club Test se prepara para bater a falta próximo a grande área.',
      }),
      expect.objectContaining({
        narration: 'A bola ficou na barreira.',
      }),
    ])
  })
})
