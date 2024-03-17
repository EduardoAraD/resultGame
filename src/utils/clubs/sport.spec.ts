import { isClubPreCreated } from '../../Model/Club'
import { sport } from './sport'

describe('Club Sport', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(sport)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
