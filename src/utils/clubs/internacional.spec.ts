import { isClubPreCreated } from '../../Model/Club'
import { internacional } from './internacional'

describe('Club Internacional', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(internacional)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
