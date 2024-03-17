import { isClubPreCreated } from '../../Model/Club'
import { nacionalDePatos } from './nacionalDePatos'

describe('Club Nacional de Patos', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(nacionalDePatos)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
