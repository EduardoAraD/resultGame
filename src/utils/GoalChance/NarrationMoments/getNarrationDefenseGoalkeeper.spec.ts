import { getNarrationDefenseGoalkeeper } from './getNarrationDefenseGoalkeeper'

describe('Function getNarrationDefenseGoalkeeper', () => {
  afterAll(() => {
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  it('should be return a narration for a random number less than 33', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.123456789)

    const narration = getNarrationDefenseGoalkeeper()

    expect(narration).toBe('Defendeeeeu goleiro. Que incrível.')
  })
  it('should be return a narration for a random number greater than 33 and less than 66', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.453456789)

    const narration = getNarrationDefenseGoalkeeper()

    expect(narration).toBe('Goleeeeiro faz milagre e espalma a bola.')
  })
  it('should be return a narration for a random number greater than 66', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.723456789)

    const narration = getNarrationDefenseGoalkeeper()

    expect(narration).toBe('Defendeu!! O goleiro faz a ponte para defender.')
  })
})
