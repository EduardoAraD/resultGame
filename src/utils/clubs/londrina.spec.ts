import { isClubPreCreated } from '../../Model/Club'
import { londrina } from './londrina'

describe('Club Londrina', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(londrina)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
