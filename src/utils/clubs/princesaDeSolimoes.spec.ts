import { isClubPreCreated } from '../../Model/Club'
import { princesaDeSolimoes } from './princesaDeSolimoes'

describe('Club Princesa Solimoes', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(princesaDeSolimoes)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
