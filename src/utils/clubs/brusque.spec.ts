import { isClubPreCreated } from '../../Model/Club'
import { brusque } from './brusque'

describe('Club Brusque', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(brusque)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
