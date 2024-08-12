import { getMomentReboundKick } from './getMomentReboudKick'

const expectedGoal = 0.8
describe('Function getMomentShortKick', () => {
  afterAll(() => {
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  it('should be return some kick out moment', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.05)

    const { moments, proxChance } = getMomentReboundKick({
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
        narration: 'A bola sobra para o atacante.',
      }),
      expect.objectContaining({
        stats: expect.objectContaining({
          shotsOnGoal: 0,
          shotsOut: 1,
          goal: 0,
          expectedGoal,
        }),
      }),
    ])
  })

  it('should be return some kick blocked moment', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.15)

    const { moments, proxChance } = getMomentReboundKick({
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
        narration: 'A bola sobra para o atacante.',
      }),
      expect.objectContaining({
        stats: expect.objectContaining({
          shotsOnGoal: 0,
          shotsBlocked: 1,
          goal: 0,
          expectedGoal,
        }),
      }),
    ])
  })

  it('should be return a moment for defense hold goalkeeper', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.25)

    const { moments, proxChance } = getMomentReboundKick({
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
        narration: 'A bola sobra para o atacante.',
      }),
      expect.objectContaining({
        stats: expect.objectContaining({
          shotsOnGoal: 1,
          goal: 0,
          expectedGoal,
        }),
      }),
    ])
  })

  it('should be return a moments for goal of the club', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.4)

    const { moments, proxChance } = getMomentReboundKick({
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
        narration: 'A bola sobra para o atacante.',
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
})
