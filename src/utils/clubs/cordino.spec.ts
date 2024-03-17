import { isClubPreCreated } from '../../Model/Club'
import { cordino } from './cordino'

describe('Club Cordino', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(cordino)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
