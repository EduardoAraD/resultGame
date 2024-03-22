import { getPassForwardPlay } from './getPassForward'

describe('Function getPassForwardPlay', () => {
  afterAll(() => {
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  it('should be return some wrong pass moment', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.1)

    const { moments, proxChance } = getPassForwardPlay({
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
        narration: 'Tenta fazer o passe para frente.',
      }),
      expect.objectContaining({
        narration: 'Vissh, errou o passe, a posse troca de lado.',
      }),
    ])
  })

  it('should be return a moment of shots', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.4)

    const { moments } = getPassForwardPlay({
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
        narration: 'Tenta fazer o passe para frente.',
      }),
    )
    expect(moments[1]).toEqual(
      expect.objectContaining({
        narration: 'Faz a tabela e acha uma oportunidade para chute.',
      }),
    )
    expect(moments[2]).toEqual(
      expect.objectContaining({
        narration: 'O jogador faz o chute',
      }),
    )
  })

  it('should be return a moment of long free', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.55)

    const { moments, proxChance } = getPassForwardPlay({
      minute: 90,
      homeOrAway: 'home',
      nameClub: 'Club Test',
      domain: {
        home: 50,
        away: 50,
      },
    })

    expect(proxChance).toBe('LONG FREE')
    expect(moments.length).toBe(2)
    expect(moments).toEqual([
      expect.objectContaining({
        narration: 'Tenta fazer o passe para frente.',
      }),
      expect.objectContaining({
        narration: 'Falta marcada! Uma chegada forte no jogador',
      }),
    ])
  })

  it('should be return a moment of long kick', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.8)

    const { moments } = getPassForwardPlay({
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
        narration: 'Tenta fazer o passe para frente.',
      }),
    )
    expect(moments[1]).toEqual(
      expect.objectContaining({
        narration: 'O Club Test vai arriscar de longe.',
      }),
    )
  })
})
