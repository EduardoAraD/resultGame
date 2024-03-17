import { isClubPreCreated } from '../../Model/Club'
import { coritiba } from './coritiba'

describe('Club Coritiba', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(coritiba)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
