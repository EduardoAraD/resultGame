import { getDeepLaunchCentral } from './getDeepLaunchCentral'

describe('Function getDeepLaunchCentral', () => {
  afterAll(() => {
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  it('should be return a moment of strong lauch', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.3)

    const { moments, proxChance } = getDeepLaunchCentral({
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
        narration: 'Faz o lançamento em profundidade atrás da defesa.',
      }),
      expect.objectContaining({
        narration: 'O lançamento foi forte demais e a bola fica com o goleiro.',
      }),
    ])
  })

  it('should be return a moment of defense play', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.6)

    const { moments, proxChance } = getDeepLaunchCentral({
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
        narration: 'Faz o lançamento em profundidade atrás da defesa.',
      }),
      expect.objectContaining({
        narration: 'A defesa corta e afasta o perigo',
      }),
    ])
  })

  it('should be return a moment of domain ball and short kick', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.8)

    const { moments } = getDeepLaunchCentral({
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
        narration: 'Faz o lançamento em profundidade atrás da defesa.',
      }),
    )
    expect(moments[1]).toEqual(
      expect.objectContaining({
        narration: 'O jogador domina e parte para o gol.',
      }),
    )
    expect(moments[2]).toEqual(
      expect.objectContaining({
        narration: 'O jogador está na cara do gol, pronto para marcar!',
      }),
    )
  })
})
