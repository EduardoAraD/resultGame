import { isClubPreCreated } from '../../Model/Club'
import { crb } from './crb'

describe('Club CRB', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(crb)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
