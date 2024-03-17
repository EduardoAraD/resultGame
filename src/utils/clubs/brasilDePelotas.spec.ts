import { isClubPreCreated } from '../../Model/Club'
import { brasilDePelotas } from './brasilDePelotas'

describe('Club Brasil de Pelotas', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(brasilDePelotas)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
