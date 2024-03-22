import { getNarrationKickBlocked } from './getNarrationKickBlocked'

describe('Function getNarrationKickBlocked', () => {
  afterAll(() => {
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  it('should be return a narration for a random number less than 50', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.323456789)

    const narration = getNarrationKickBlocked()

    expect(narration).toBe('A defesa bloqueia o chutee afasta o perigo.')
  })
  it('should be return a narration for a random number greater than 50', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.723456789)

    const narration = getNarrationKickBlocked()

    expect(narration).toBe('Bloqueado pela defesa.')
  })
})
