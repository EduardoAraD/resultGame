import { isClubPreCreated } from '../../Model/Club'
import { xvDePiracicaba } from './xvDePiracicaba'

describe('Club XV de Novembro', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(xvDePiracicaba)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
