import { isClubPreCreated } from '../../Model/Club'
import { csa } from './csa'

describe('Club CSA', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(csa)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
