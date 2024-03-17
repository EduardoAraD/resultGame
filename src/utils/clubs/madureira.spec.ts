import { isClubPreCreated } from '../../Model/Club'
import { madureira } from './madureira'

describe('Club Madureira', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(madureira)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
