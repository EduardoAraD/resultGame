import { isClubPreCreated } from '../../Model/Club'
import { aimore } from './aimore'

describe('Club Aimoré', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(aimore)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
