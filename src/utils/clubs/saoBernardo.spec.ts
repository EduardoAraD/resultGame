import { isClubPreCreated } from '../../Model/Club'
import { saoBernardo } from './saoBernardo'

describe('Club Sao Bernardo', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(saoBernardo)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
