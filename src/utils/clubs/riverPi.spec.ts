import { isClubPreCreated } from '../../Model/Club'
import { riverPI } from './riverPi'

describe('Club River', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(riverPI)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
