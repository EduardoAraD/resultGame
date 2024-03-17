import { isClubPreCreated } from '../../Model/Club'
import { crato } from './crato'

describe('Club Crato', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(crato)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
