import { isClubPreCreated } from '../../Model/Club'
import { bragantino } from './rbBragantino'

describe('Club Bragantino', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(bragantino)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
