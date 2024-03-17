import { isClubPreCreated } from '../../Model/Club'
import { desportivaFerroviaria } from './desportivaFerroviaria'

describe('Club Desportiva Ferroviária', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(desportivaFerroviaria)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
