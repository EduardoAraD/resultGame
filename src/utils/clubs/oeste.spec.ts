import { isClubPreCreated } from '../../Model/Club'
import { oeste } from './oeste'

describe('Club Oeste', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(oeste)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
