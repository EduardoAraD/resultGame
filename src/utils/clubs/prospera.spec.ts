import { isClubPreCreated } from '../../Model/Club'
import { prospera } from './prospera'

describe('Club Prospera', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(prospera)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
