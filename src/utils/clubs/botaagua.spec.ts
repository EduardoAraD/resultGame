import { isClubPreCreated } from '../../Model/Club'
import { botaagua } from './botaagua'

describe('Club Botaagua', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(botaagua)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
