import { isClubPreCreated } from '../../Model/Club'
import { floresta } from './floresta'

describe('Club Floresta', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(floresta)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
