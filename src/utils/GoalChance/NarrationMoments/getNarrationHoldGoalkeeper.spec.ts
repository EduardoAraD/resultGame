import { getNarrationHoldGoalkeeper } from './getNarrationHoldGoalkeeper'

describe('Function getNarrationHoldGoalkeeper', () => {
  afterAll(() => {
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  it('should be return a narration for a random number less than 25', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.123456789)

    const narration = getNarrationHoldGoalkeeper()

    expect(narration).toBe('Defende com tranquilidade o goleiro.')
  })
  it('should be return a narration for a random number greater than 25 and less than 50', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.453456789)

    const narration = getNarrationHoldGoalkeeper()

    expect(narration).toBe('Espalma o goleiro e a defesa tem a posse.')
  })
  it('should be return a narration for a random number greater than 50 and less than 75', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.603456789)

    const narration = getNarrationHoldGoalkeeper()

    expect(narration).toBe('Segura firme o goleiro')
  })
  it('should be return a narration for a random number greater than 75', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.823456789)

    const narration = getNarrationHoldGoalkeeper()

    expect(narration).toBe('Nas mãos do goleiro, a bola veio direto nele')
  })
})
