import { getSidePlay } from './getSidePlay'

describe('Function getSidePlay', () => {
  afterAll(() => {
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  it('should be return a moment of pass back', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.1)

    const { moments } = getSidePlay({
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
        narration: 'Consegui o domínio pela ponta esquerda.',
      }),
    )
    expect(moments[1]).toEqual(
      expect.objectContaining({
        narration: 'O jogador faz o dribe e parte para a grande área.',
      }),
    )
    expect(moments[2]).toEqual(
      expect.objectContaining({
        narration: 'Chega a linha de fundo e faz o passe para trás.',
      }),
    )
  })

  it('should be return a moment of short cross', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.25)

    const { moments } = getSidePlay({
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
        narration: 'Consegui o domínio pela ponta esquerda.',
      }),
    )
    expect(moments[1]).toEqual(
      expect.objectContaining({
        narration: 'O jogador faz o dribe e parte para a grande área.',
      }),
    )
    expect(moments[2]).toEqual(
      expect.objectContaining({
        narration: 'Faz o cruzamento curto.',
      }),
    )
  })

  it('should be return a moment of long cross', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.7)

    const { moments } = getSidePlay({
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
        narration: 'Consegui o domínio pela ponta direita.',
      }),
    )
    expect(moments[1]).toEqual(
      expect.objectContaining({
        narration: 'O Club Test faz o cruzamento na primeira trave.',
      }),
    )
  })

  it('should be return some recover ball moment', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.9)

    const { moments, proxChance } = getSidePlay({
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
    expect(moments[0]).toEqual(
      expect.objectContaining({
        narration: 'Consegui o domínio pela ponta direita.',
      }),
    )
    expect(moments[1]).toEqual(
      expect.objectContaining({
        narration:
          'Tentou passar pela defesa e não conseguiu. A posse troca de lado.',
      }),
    )
  })
})
