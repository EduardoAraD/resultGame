import { getDeepPass } from './getDeepPass'

describe('Function getDeepPass', () => {
  afterAll(() => {
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  it('should be return a moment of short kick', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.2)

    const { moments } = getDeepPass({
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
        narration: 'Tenta fazer o passe em profundidade.',
      }),
    )
    expect(moments[1]).toEqual(
      expect.objectContaining({
        narration:
          'Fez o passe nas costas da defesa. O Club Test parte para o gol',
      }),
    )
    expect(moments[2]).toEqual(
      expect.objectContaining({
        narration: 'O jogador está na cara do gol, pronto para marcar!',
      }),
    )
  })

  it('should be return a moment of short free', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.4)

    const { moments, proxChance } = getDeepPass({
      minute: 90,
      homeOrAway: 'home',
      nameClub: 'Club Test',
      domain: {
        home: 50,
        away: 50,
      },
    })

    expect(proxChance).toBe('SHORT FREE')
    expect(moments.length).toBe(2)
    expect(moments).toEqual([
      expect.objectContaining({
        narration: 'Tenta fazer o passe em profundidade.',
      }),
      expect.objectContaining({
        narration: 'Isso é falta! Derrubaram o jogador na hora do passe.',
      }),
    ])
  })

  it('should be return some wrong pass moment', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.7)

    const { moments, proxChance } = getDeepPass({
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
        narration: 'Tenta fazer o passe em profundidade.',
      }),
      expect.objectContaining({
        narration: 'Não passa pela defesa',
      }),
    ])
  })
})
