import { isClubPreCreated } from '../../Model/Club'
import { saoBento } from './saoBento'

describe('Club Sao Bento', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(saoBento)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
