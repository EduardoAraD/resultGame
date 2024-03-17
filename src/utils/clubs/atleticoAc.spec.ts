import { isClubPreCreated } from '../../Model/Club'
import { atleticoAC } from './atleticoAc'

describe('Club Atletico AC', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(atleticoAC)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
