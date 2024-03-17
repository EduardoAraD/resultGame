import { isClubPreCreated } from '../../Model/Club'
import { ituano } from './ituano'

describe('Club Ituano', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(ituano)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
