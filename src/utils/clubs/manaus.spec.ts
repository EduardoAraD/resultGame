import { isClubPreCreated } from '../../Model/Club'
import { manaus } from './manaus'

describe('Club Manaus', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(manaus)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
