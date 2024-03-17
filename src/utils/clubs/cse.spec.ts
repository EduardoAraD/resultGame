import { isClubPreCreated } from '../../Model/Club'
import { cse } from './cse'

describe('Club CSE', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(cse)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
