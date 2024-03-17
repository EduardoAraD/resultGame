import { isClubPreCreated } from '../../Model/Club'
import { costaRicaMS } from './costaRicaMs'

describe('Club Costa Rica', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(costaRicaMS)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
