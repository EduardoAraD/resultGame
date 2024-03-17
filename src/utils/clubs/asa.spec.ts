import { isClubPreCreated } from '../../Model/Club'
import { asa } from './asa'

describe('Club Asa', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(asa)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
