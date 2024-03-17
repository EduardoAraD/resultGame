import { isClubPreCreated } from '../../Model/Club'
import { athleticClub } from './athleticClub'

describe('Club Athletic Club', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(athleticClub)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
