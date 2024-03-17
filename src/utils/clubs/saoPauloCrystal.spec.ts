import { isClubPreCreated } from '../../Model/Club'
import { saoPauloCrystal } from './saoPauloCrystal'

describe('Club Sao Paulo Crystal', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(saoPauloCrystal)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
