import { getLaunchPlay } from './getLauchPlay'

describe('Function getLauchPlay', () => {
  afterAll(() => {
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  it('should be return a moment of deep lauch central', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.49)

    const { moments } = getLaunchPlay({
      minute: 90,
      homeOrAway: 'home',
      nameClub: 'Club Test',
      domain: {
        home: 50,
        away: 50,
      },
    })

    expect(moments.length).toBeGreaterThan(1)
    expect(moments[0]).toEqual(
      expect.objectContaining({
        narration: 'Faz o lançamento em profundidade atrás da defesa.',
      }),
    )
  })

  it('should be return a moment of deep lauch side', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.51)

    const { moments } = getLaunchPlay({
      minute: 90,
      homeOrAway: 'home',
      nameClub: 'Club Test',
      domain: {
        home: 50,
        away: 50,
      },
    })

    expect(moments.length).toBeGreaterThan(1)
    expect(moments[0]).toEqual(
      expect.objectContaining({
        narration: 'Faz o lançamento em profundidade pela ponta.',
      }),
    )
  })
})
