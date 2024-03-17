import { isClubPreCreated } from '../../Model/Club'
import { criciuma } from './criciuma'

describe('Club Criciuma', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(criciuma)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
