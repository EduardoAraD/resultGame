import { getNarrationKickOut } from './getNarrationKickOut'

describe('Function getNarrationKickOut', () => {
  afterAll(() => {
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  it('should be return a narration for a random number less than 25', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.123456789)

    const narration = getNarrationKickOut()

    expect(narration).toBe('Muito Longe, tiro de meta para o goleiro.')
  })
  it('should be return a narration for a random number greater than 25 and less than 50', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.453456789)

    const narration = getNarrationKickOut()

    expect(narration).toBe('Raspa a trave e vai para fora.')
  })
  it('should be return a narration for a random number greater than 50 and less than 75', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.603456789)

    const narration = getNarrationKickOut()

    expect(narration).toBe('Para fooora. Incrível a oportunidade que perde.')
  })
  it('should be return a narration for a random number greater than 75', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.823456789)

    const narration = getNarrationKickOut()

    expect(narration).toBe('Para fooora, que perigo essa bola.')
  })
})
