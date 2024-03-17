import { isClubPreCreated } from '../../Model/Club'
import { atleticoMG } from './atleticoMg'

describe('Club Atletico MG', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(atleticoMG)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
