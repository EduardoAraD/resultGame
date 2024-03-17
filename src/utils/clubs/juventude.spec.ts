import { isClubPreCreated } from '../../Model/Club'
import { juventude } from './juventude'

describe('Club Juventude', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(juventude)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
