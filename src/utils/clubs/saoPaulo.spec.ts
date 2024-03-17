import { isClubPreCreated } from '../../Model/Club'
import { saoPaulo } from './saoPaulo'

describe('Club Sao Paulo', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(saoPaulo)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
