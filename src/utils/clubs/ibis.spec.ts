import { isClubPreCreated } from '../../Model/Club'
import { ibis } from './ibis'

describe('Club Ibis', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(ibis)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
