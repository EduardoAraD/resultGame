import { isClubPreCreated } from '../../Model/Club'
import { gremio } from './gremio'

describe('Club Gremio', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(gremio)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
