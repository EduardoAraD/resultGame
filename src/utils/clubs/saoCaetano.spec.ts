import { isClubPreCreated } from '../../Model/Club'
import { saoCaetano } from './saoCaetano'

describe('Club Sao Caetano', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(saoCaetano)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
