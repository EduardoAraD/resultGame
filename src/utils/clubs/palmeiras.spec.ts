import { isClubPreCreated } from '../../Model/Club'
import { palmeiras } from './palmeiras'

describe('Club Palmeiras', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(palmeiras)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
