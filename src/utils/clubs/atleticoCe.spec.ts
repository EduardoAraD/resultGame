import { isClubPreCreated } from '../../Model/Club'
import { atleticoCE } from './atleticoCe'

describe('Club Atletico CE', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(atleticoCE)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
