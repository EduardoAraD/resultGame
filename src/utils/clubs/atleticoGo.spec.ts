import { isClubPreCreated } from '../../Model/Club'
import { atleticoGO } from './atleticoGo'

describe('Club Atletico GO', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(atleticoGO)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
