import { isClubPreCreated } from '../../Model/Club'
import { gremioAnapolis } from './gremioAnapolis'

describe('Club Gremio Anapolis', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(gremioAnapolis)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
