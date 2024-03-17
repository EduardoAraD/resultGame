import { isClubPreCreated } from '../../Model/Club'
import { resende } from './resende'

describe('Club Resende', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(resende)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
