import { getMomentShortCross } from './getMomentShortCross'

describe('Function getMomentShortCross', () => {
  afterAll(() => {
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  it('should be return a moment of head kick', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.2)

    const { moments } = getMomentShortCross({
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
        narration: 'Faz o cruzamento curto.',
      }),
    )
    expect(moments[1]).toEqual(
      expect.objectContaining({
        narration: 'O atacante faz a cabeçada!',
      }),
    )
  })

  it('should be return a moment of short kick', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.6)

    const { moments } = getMomentShortCross({
      minute: 90,
      homeOrAway: 'away',
      nameClub: 'Club Test',
      domain: {
        home: 50,
        away: 50,
      },
    })

    expect(moments.length).toBeGreaterThan(2)
    expect(moments[0]).toEqual(
      expect.objectContaining({
        narration: 'Faz o cruzamento curto.',
      }),
    )
    expect(moments[1]).toEqual(
      expect.objectContaining({
        narration: 'O jogador está na cara do gol, pronto para marcar!',
      }),
    )
  })

  it('should be return a momente of goalkeeper', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.72)

    const { moments, proxChance } = getMomentShortCross({
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
        narration: 'Faz o cruzamento curto.',
      }),
      expect.objectContaining({
        narration: 'O goleiro se antecipa e segura a bola',
      }),
    ])
  })

  it('should be return a moment of defense and corner kick', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.84)

    const { moments, proxChance } = getMomentShortCross({
      minute: 90,
      homeOrAway: 'home',
      nameClub: 'Club Test',
      domain: {
        home: 50,
        away: 50,
      },
    })

    expect(proxChance).toBe('CORNER KICK')
    expect(moments.length).toBe(2)
    expect(moments).toEqual([
      expect.objectContaining({
        narration: 'Faz o cruzamento curto.',
      }),
      expect.objectContaining({
        narration: 'A defesa corta para linha de fundo. É escanteio!',
      }),
    ])
  })

  it('should be return a moment of partial defense', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.95)

    const { moments, proxChance } = getMomentShortCross({
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
        narration: 'Faz o cruzamento curto.',
      }),
      expect.objectContaining({
        narration: 'Corta a defesa e afasta o perigo',
      }),
    ])
  })
})
