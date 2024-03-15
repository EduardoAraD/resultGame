import { getMomentsOnPenaltyGoalChance } from './getMomentsOnPenaltyGoalChance'

describe('Function getMomentsOnPenaltyGoalChance', () => {
  afterAll(() => {
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  it('should be delivered two objects Moments (started and goal)', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.123456789)

    const response = getMomentsOnPenaltyGoalChance({
      overallAll: 100,
      overallClub: 50,
      nameClube: 'Botaagua',
      homeOrAway: 'home',
      numberOfPenalt: 1,
    })

    expect(response.length).toBe(2)
    expect(response).toEqual([
      expect.objectContaining({
        narration: 'Botaagua para sua 1° cobrança',
      }),
      expect.objectContaining({
        minute: 90,
        narration: 'Gol de Penalti',
      }),
    ])
  })

  it('should be delivered two objects Moments (started and missed on goal)', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.763456789)

    const response = getMomentsOnPenaltyGoalChance({
      overallAll: 100,
      overallClub: 50,
      nameClube: 'Name',
      homeOrAway: 'home',
      numberOfPenalt: 3,
    })

    expect(response.length).toBe(2)
    expect(response).toEqual([
      expect.objectContaining({
        narration: 'Name para sua 3° cobrança',
      }),
      expect.objectContaining({
        minute: 90,
        narration: 'Perdeu o Penalti',
      }),
    ])
  })
})
