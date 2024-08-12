import { getChanceGoal } from '.'

describe('Function getGoalChange', () => {
  afterAll(() => {
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  it('should be return a moment of corner kick', () => {
    const { moments } = getChanceGoal({
      minute: 90,
      nameClub: 'Club Test',
      homeOrAway: 'home',
      domain: {
        home: 85,
        away: 15,
      },
      proxMoment: 'CORNER KICK',
    })

    expect(moments.length).toBeGreaterThan(1)
    expect(moments[0]).toEqual(
      expect.objectContaining({
        narration: 'Vai ser cobrado escanteio para o Club Test.',
      }),
    )
  })
  it('should be return a moment of long free', () => {
    const { moments } = getChanceGoal({
      minute: 90,
      nameClub: 'Club Test',
      homeOrAway: 'home',
      domain: {
        home: 85,
        away: 15,
      },
      proxMoment: 'LONG FREE',
    })

    expect(moments.length).toBeGreaterThan(1)
    expect(moments[0]).toEqual(
      expect.objectContaining({
        narration:
          'O Club Test se prepara para bater a falta de longa distância',
      }),
    )
  })
  it('should be return a moment of short free', () => {
    const { moments } = getChanceGoal({
      minute: 90,
      nameClub: 'Club Test',
      homeOrAway: 'home',
      domain: {
        home: 85,
        away: 15,
      },
      proxMoment: 'SHORT FREE',
    })

    expect(moments.length).toBeGreaterThan(1)
    expect(moments[0]).toEqual(
      expect.objectContaining({
        narration:
          'O Club Test se prepara para bater a falta próximo a grande área.',
      }),
    )
  })
  it('should be return a moment of penalty', () => {
    const { moments } = getChanceGoal({
      minute: 90,
      nameClub: 'Club Test',
      homeOrAway: 'home',
      domain: {
        home: 85,
        away: 15,
      },
      proxMoment: 'PENALTY',
    })

    expect(moments.length).toBeGreaterThan(1)
    expect(moments[0]).toEqual(
      expect.objectContaining({
        narration: 'O jogador se prepara para cobrar o penalti.',
      }),
    )
  })

  it('should be return a moment of lauch play', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.3)

    const { moments } = getChanceGoal({
      minute: 90,
      nameClub: 'Club Test',
      homeOrAway: 'home',
      domain: {
        home: 85,
        away: 15,
      },
    })

    expect(moments.length).toBeGreaterThan(2)
    expect(moments[0]).toEqual(
      expect.objectContaining({
        narration: 'O Club Test tem a posse de bola.',
      }),
    )
    expect(moments[1]).toEqual(
      expect.objectContaining({
        narration: 'Faz o lançamento em profundidade atrás da defesa.',
      }),
    )
  })

  it('should be return a moment of ball possession play', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.31)

    const { moments } = getChanceGoal({
      minute: 90,
      nameClub: 'Club Test',
      homeOrAway: 'home',
      domain: {
        home: 85,
        away: 15,
      },
      proxMoment: 'STANTARD',
    })

    expect(moments.length).toBeGreaterThan(2)
    expect(moments[0]).toEqual(
      expect.objectContaining({
        narration: 'O Club Test tem a posse de bola.',
      }),
    )
    expect(moments[1]).toEqual(
      expect.objectContaining({
        narration: 'Consegui o domínio pela ponta esquerda.',
      }),
    )
  })
})
