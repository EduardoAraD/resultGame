import { isClubPreCreated } from '../../Model/Club'
import { joinville } from './joinville'

describe('Club Joinville', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(joinville)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
