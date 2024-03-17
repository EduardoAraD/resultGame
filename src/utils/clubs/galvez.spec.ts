import { isClubPreCreated } from '../../Model/Club'
import { galvez } from './galvez'

describe('Club Galvez', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(galvez)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
