import { isClubPreCreated } from '../../Model/Club'
import { icasa } from './icasa'

describe('Club Icasa', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(icasa)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
