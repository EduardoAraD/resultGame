import { isClubPreCreated } from '../../Model/Club'
import { paysandu } from './paysandu'

describe('Club Paysandu', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(paysandu)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
