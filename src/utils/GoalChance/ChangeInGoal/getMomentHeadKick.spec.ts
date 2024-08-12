import { getMomentHeadKick } from './getMomentHeadKick'

const expectedGoal = 0.3
describe('Function getMomentHeadKick', () => {
  afterAll(() => {
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  it('should be return a moments for defense hold goalkeeper', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.123456789)

    const { moments, proxChance } = getMomentHeadKick({
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
      expect.objectContaining({ narration: 'O atacante faz a cabeçada!' }),
      expect.objectContaining({
        stats: expect.objectContaining({ shotsOnGoal: 1, expectedGoal }),
      }),
    ])
  })

  it('should be return a moments for goal of the club', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.323456789)

    const { moments, proxChance } = getMomentHeadKick({
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
      expect.objectContaining({ narration: 'O atacante faz a cabeçada!' }),
      expect.objectContaining({
        stats: expect.objectContaining({
          shotsOnGoal: 1,
          goal: 1,
          expectedGoal,
        }),
      }),
    ])
  })

  it('should be return some kick out moments', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.703456789)

    const { moments, proxChance } = getMomentHeadKick({
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
      expect.objectContaining({ narration: 'O atacante faz a cabeçada!' }),
      expect.objectContaining({
        stats: expect.objectContaining({
          shotsOut: 1,
          expectedGoal,
        }),
      }),
    ])
  })
})
