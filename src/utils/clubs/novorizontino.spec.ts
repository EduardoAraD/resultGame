import { isClubPreCreated } from '../../Model/Club'
import { novorizontino } from './novorizontino'

describe('Club Novorizontino', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(novorizontino)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
