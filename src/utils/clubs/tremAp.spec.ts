import { isClubPreCreated } from '../../Model/Club'
import { tremAp } from './tremAp'

describe('Club Trem AP', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(tremAp)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
