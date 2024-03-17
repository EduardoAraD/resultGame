import { isClubPreCreated } from '../../Model/Club'
import { urt } from './urt'

describe('Club URT', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(urt)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
