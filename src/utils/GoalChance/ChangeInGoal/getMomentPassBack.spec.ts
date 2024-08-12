import { getMomentPassBack } from './getMomentPassBack'

describe('Function getMomentPassBack', () => {
  afterAll(() => {
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  it('should be return a moment of short kick', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.2)

    const { moments } = getMomentPassBack({
      minute: 90,
      homeOrAway: 'home',
      nameClub: 'Club Test',
      domain: {
        home: 50,
        away: 50,
      },
    })

    expect(moments[0]).toEqual(
      expect.objectContaining({
        narration: 'Chega a linha de fundo e faz o passe para trás.',
      }),
    )
    expect(moments[1]).toEqual(
      expect.objectContaining({
        narration: 'O jogador está na cara do gol, pronto para marcar!',
      }),
    )
  })

  it('should be return a moment of shots', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.34)

    const { moments } = getMomentPassBack({
      minute: 90,
      homeOrAway: 'home',
      nameClub: 'Club Test',
      domain: {
        home: 50,
        away: 50,
      },
    })

    expect(moments[0]).toEqual(
      expect.objectContaining({
        narration: 'Chega a linha de fundo e faz o passe para trás.',
      }),
    )
    expect(moments[1]).toEqual(
      expect.objectContaining({
        narration: 'O jogador faz o chute',
      }),
    )
  })

  it('should be return a moment of goalkeeper', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.6)

    const { moments, proxChance } = getMomentPassBack({
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
        narration: 'Chega a linha de fundo e faz o passe para trás.',
      }),
      expect.objectContaining({
        narration: 'O goleiro se antecipa e segura a bola',
      }),
    ])
  })

  it('should be return a moment of corner kick of club', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.84)

    const { moments, proxChance } = getMomentPassBack({
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
        narration: 'Chega a linha de fundo e faz o passe para trás.',
      }),
      expect.objectContaining({
        narration: 'A defesa corta para linha de fundo. É escanteio',
      }),
    ])
  })

  it('should be return a moment of partial defense', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.95)

    const { moments, proxChance } = getMomentPassBack({
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
        narration: 'Chega a linha de fundo e faz o passe para trás.',
      }),
      expect.objectContaining({
        narration: 'Corta a defesa e afasta o perigo',
      }),
    ])
  })
})
