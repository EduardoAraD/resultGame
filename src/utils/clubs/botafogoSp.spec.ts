import { isClubPreCreated } from '../../Model/Club'
import { botafogoSP } from './botafogoSp'

describe('Club Botafogo SP', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(botafogoSP)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
