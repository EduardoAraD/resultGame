import { isClubPreCreated } from '../../Model/Club'
import { democrata } from './democrata'

describe('Club Democrata', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(democrata)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
