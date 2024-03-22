import { getBallPossetionPlay } from './getBallPossetionPlay'

describe('Function getBallPossetionPlay', () => {
  afterAll(() => {
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  it('should be return a moment of side play', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.49)

    const { moments } = getBallPossetionPlay({
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
        narration: 'Consegui o domínio pela ponta esquerda.',
      }),
    )
  })

  it('should be return a moment of central play', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.5)

    const { moments } = getBallPossetionPlay({
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
        narration: 'Vem chegando pelo meio.',
      }),
    )
  })
})
