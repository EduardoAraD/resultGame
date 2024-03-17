import { isClubPreCreated } from '../../Model/Club'
import { crac } from './crac'

describe('Club CRAC', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(crac)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
