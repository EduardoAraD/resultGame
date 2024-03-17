import { isClubPreCreated } from '../../Model/Club'
import { audax } from './audax'

describe('Club Audax Angra', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(audax)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
