import { isClubPreCreated } from '../../Model/Club'
import { saoJoseense } from './saoJoseense'

describe('Club Sao Joseense', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(saoJoseense)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
