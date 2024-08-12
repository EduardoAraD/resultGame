import { getMomentLongKick } from './getMomentLongKick'

const expectedGoal = 0.2
describe('Function getMomentHeadKick', () => {
  afterAll(() => {
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  it('should be return a moments for goal of the club', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.05)

    const { moments, proxChance } = getMomentLongKick({
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
        narration: 'O Club Test vai arriscar de longe.',
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

  it('should be return some kick blocked moment', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.15)

    const { moments, proxChance } = getMomentLongKick({
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
        narration: 'O Club Test vai arriscar de longe.',
      }),
      expect.objectContaining({
        stats: expect.objectContaining({
          shotsBlocked: 1,
          goal: 0,
          shotsOnGoal: 0,
          shotsOut: 0,
          expectedGoal,
        }),
      }),
    ])
  })

  it('should be return a moment defense hold goalkeeper', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.3)

    const { moments, proxChance } = getMomentLongKick({
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
        narration: 'O Club Test vai arriscar de longe.',
      }),
      expect.objectContaining({
        stats: expect.objectContaining({
          shotsBlocked: 0,
          goal: 0,
          shotsOnGoal: 1,
          shotsOut: 0,
          expectedGoal,
        }),
      }),
    ])
  })

  it('should be return some kick out moment', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.5)

    const { moments, proxChance } = getMomentLongKick({
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
        narration: 'O Club Test vai arriscar de longe.',
      }),
      expect.objectContaining({
        stats: expect.objectContaining({
          shotsBlocked: 0,
          goal: 0,
          shotsOnGoal: 0,
          shotsOut: 1,
          expectedGoal,
        }),
      }),
    ])
  })
})
