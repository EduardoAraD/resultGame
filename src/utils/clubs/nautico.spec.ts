import { isClubPreCreated } from '../../Model/Club'
import { nautico } from './nautico'

describe('Club Naútico', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(nautico)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
