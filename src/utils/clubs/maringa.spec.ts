import { isClubPreCreated } from '../../Model/Club'
import { maringa } from './maringa'

describe('Club Maringa', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(maringa)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
