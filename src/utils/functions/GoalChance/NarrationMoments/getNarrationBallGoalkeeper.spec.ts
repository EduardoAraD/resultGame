import { getNarrationBallGoalkeeper } from './getNarrationBallGoalkeeper'

describe('Function getNarrationBallGoalkeeper', () => {
  afterAll(() => {
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  it('should be return a narration for a random number less than 50', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.123456789)

    const narration = getNarrationBallGoalkeeper()

    expect(narration).toBe('Goleiro segura a bola e alivia a defesa')
  })
  it('should be return a narration for a random number greater than 50', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.723456789)

    const narration = getNarrationBallGoalkeeper()

    expect(narration).toBe('O goleiro se antecipa e segura a bola')
  })
})
