import { isClubPreCreated } from '../../Model/Club'
import { marica } from './marica'

describe('Club Marica', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(marica)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
