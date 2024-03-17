import { isClubPreCreated } from '../../Model/Club'
import { concordia } from './concordia'

describe('Club Concordia', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(concordia)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
