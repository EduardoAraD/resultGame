import { getCornerKickPlay } from './getCornerKickPlay'

describe('Function getCentralPlay', () => {
  afterAll(() => {
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  it('should be return a moment of short cross', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.29)

    const { moments } = getCornerKickPlay({
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
        narration: 'Vai ser cobrado escanteio para o Club Test.',
      }),
    )
    expect(moments[1]).toEqual(
      expect.objectContaining({
        narration: 'Faz o passe curto',
      }),
    )
    expect(moments[2]).toEqual(
      expect.objectContaining({
        narration: 'Faz o cruzamento curto.',
      }),
    )
  })

  it('should be return a moment of long cross', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.3)

    const { moments } = getCornerKickPlay({
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
        narration: 'Vai ser cobrado escanteio para o Club Test.',
      }),
    )
    expect(moments[1]).toEqual(
      expect.objectContaining({
        narration: 'O Club Test faz o cruzamento na segunda trave.',
      }),
    )
  })
})
