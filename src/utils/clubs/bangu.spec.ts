import { isClubPreCreated } from '../../Model/Club'
import { bangu } from './bangu'

describe('Club Bangu', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(bangu)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
