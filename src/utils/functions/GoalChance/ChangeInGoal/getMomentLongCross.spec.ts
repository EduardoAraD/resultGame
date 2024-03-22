import { getMomentLongCross } from './getMomentLongCross'

describe('Function getMomentLongCross', () => {
  afterAll(() => {
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  it('should be return a moments defense goalkeeper', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.1)

    const { moments, proxChance } = getMomentLongCross({
      minute: 1,
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
        narration: 'O Club Test faz o cruzamento na segunda trave.',
      }),
      expect.objectContaining({
        narration: 'Goleiro segura a bola e alivia a defesa',
      }),
    ])
  })

  it('should be return a moments head kick', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.5)

    const { moments } = getMomentLongCross({
      minute: 1,
      homeOrAway: 'away',
      nameClub: 'Club Test',
      domain: {
        home: 50,
        away: 50,
      },
    })

    expect(moments[1]).toEqual(
      expect.objectContaining({
        narration: 'O atacante faz a cabeçada!',
      }),
    )
  })

  it('should be return a moment defense', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.8)

    const { moments, proxChance } = getMomentLongCross({
      minute: 1,
      homeOrAway: 'away',
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
        narration: 'O Club Test faz o cruzamento na primeira trave.',
      }),
      expect.objectContaining({
        narration: 'Corta a defesa e afasta o perigo',
      }),
    ])
  })
})
