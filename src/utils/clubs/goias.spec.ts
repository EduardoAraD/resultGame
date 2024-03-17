import { isClubPreCreated } from '../../Model/Club'
import { goias } from './goias'

describe('Club Goias', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(goias)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
