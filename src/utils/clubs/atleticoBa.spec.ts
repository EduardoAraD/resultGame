import { isClubPreCreated } from '../../Model/Club'
import { atleticoBA } from './atleticoBa'

describe('Club Atletico BA', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(atleticoBA)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
