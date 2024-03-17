import { isClubPreCreated } from '../../Model/Club'
import { nauticoRR } from './nauticoRr'

describe('Club Nautico RR', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(nauticoRR)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
