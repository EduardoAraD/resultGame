import { isClubPreCreated } from '../../Model/Club'
import { juventudeSamas } from './juventudeSamas'

describe('Club Juventude Samas', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(juventudeSamas)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
