import { getNarrationDefenseTakeAwayBall } from './getNarrationDefenseTakeAwayBall'

describe('Function getNarrationDefenseTakeAwayBall', () => {
  afterAll(() => {
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  it('should be return a narration for a random number less than 33', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.123456789)

    const narration = getNarrationDefenseTakeAwayBall()

    expect(narration).toBe('Tira a defesa de qualquer maneira')
  })
  it('should be return a narration for a random number greater than 33 and less than 66', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.453456789)

    const narration = getNarrationDefenseTakeAwayBall()

    expect(narration).toBe('A defesa corta e afasta o perigo')
  })
  it('should be return a narration for a random number greater than 66', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.723456789)

    const narration = getNarrationDefenseTakeAwayBall()

    expect(narration).toBe('Corta a defesa e afasta o perigo')
  })
})
