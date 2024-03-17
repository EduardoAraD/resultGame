import { isClubPreCreated } from '../../Model/Club'
import { santos } from './santos'

describe('Club Santos', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(santos)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
