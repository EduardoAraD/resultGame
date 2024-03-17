import { isClubPreCreated } from '../../Model/Club'
import { bahia } from './bahia'

describe('Club Bahia', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(bahia)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
