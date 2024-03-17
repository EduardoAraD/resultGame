import { isClubPreCreated } from '../../Model/Club'
import { esportivo } from './esportivoRs'

describe('Club Esportivo BG', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(esportivo)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
