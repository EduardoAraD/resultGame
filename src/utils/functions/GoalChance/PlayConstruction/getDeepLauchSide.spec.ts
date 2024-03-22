import { getDeepLauchSide } from './getDeepLauchSide'

describe('Function getDeepLauchSide', () => {
  afterAll(() => {
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  it('should be return a moment of strong lauch side', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.05)

    const { moments, proxChance } = getDeepLauchSide({
      minute: 90,
      homeOrAway: 'home',
      nameClub: 'Club Test',
      domain: {
        home: 50,
        away: 50,
      },
    })

    expect(proxChance).toBe('STANTARD')
    expect(moments.length).toBe(2)
    expect(moments).toEqual([
      expect.objectContaining({
        narration: 'Faz o lançamento em profundidade pela ponta.',
      }),
      expect.objectContaining({
        narration: 'O lançamento foi forte demais, é apenas lateral.',
      }),
    ])
  })

  it('should be return a moment of defense intercepts of ball', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.15)

    const { moments, proxChance } = getDeepLauchSide({
      minute: 90,
      homeOrAway: 'home',
      nameClub: 'Club Test',
      domain: {
        home: 50,
        away: 50,
      },
    })

    expect(proxChance).toBe('STANTARD')
    expect(moments.length).toBe(2)
    expect(moments).toEqual([
      expect.objectContaining({
        narration: 'Faz o lançamento em profundidade pela ponta.',
      }),
      expect.objectContaining({
        narration: 'A defesa intercepta e a posse muda de lado',
      }),
    ])
  })

  it('should be return a moment of domain ball and short kick', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.6)

    const { moments } = getDeepLauchSide({
      minute: 90,
      homeOrAway: 'home',
      nameClub: 'Club Test',
      domain: {
        home: 50,
        away: 50,
      },
    })

    expect(moments.length).toBeGreaterThan(2)
    expect(moments[0]).toEqual(
      expect.objectContaining({
        narration: 'Faz o lançamento em profundidade pela ponta.',
      }),
    )
    expect(moments[1]).toEqual(
      expect.objectContaining({
        narration: 'Consegui o domínio pela ponta direita.',
      }),
    )
  })
})
