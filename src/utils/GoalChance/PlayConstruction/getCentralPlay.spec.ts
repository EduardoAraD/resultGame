import { getCentralPlay } from './getCentralPlay'

describe('Function getCentralPlay', () => {
  afterAll(() => {
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  it('should be return a moment of deep pass play', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.29)

    const { moments } = getCentralPlay({
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
        narration: 'Vem chegando pelo meio.',
      }),
    )
    expect(moments[1]).toEqual(
      expect.objectContaining({
        narration: 'Tenta fazer o passe em profundidade.',
      }),
    )
  })

  it('should be return a moment of pass forward play', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.3)

    const { moments } = getCentralPlay({
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
        narration: 'Vem chegando pelo meio.',
      }),
    )
    expect(moments[1]).toEqual(
      expect.objectContaining({
        narration: 'Tenta fazer o passe para frente.',
      }),
    )
  })
})
