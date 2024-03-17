import { isClubPreCreated } from '../../Model/Club'
import { parana } from './parana'

describe('Club Parana', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(parana)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
