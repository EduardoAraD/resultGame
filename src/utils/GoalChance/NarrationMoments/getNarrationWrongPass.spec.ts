import { getNarrationWrongPass } from './getNarrationWrongPass'

describe('Function getNarrationWrongPass', () => {
  afterAll(() => {
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  it('should be return a narration for a random number less than 33', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.123456789)

    const narration = getNarrationWrongPass()

    expect(narration).toBe('Vissh, errou o passe, a posse troca de lado.')
  })
  it('should be return a narration for a random number greater than 33 and less than 66', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.453456789)

    const narration = getNarrationWrongPass()

    expect(narration).toBe('Passe errado, a defesa retoma.')
  })
  it('should be return a narration for a random number greater than 66', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.723456789)

    const narration = getNarrationWrongPass()

    expect(narration).toBe('Não passa pela defesa')
  })
})
