import { isClubPreCreated } from '../../Model/Club'
import { portuguesa } from './portuguesa'

describe('Club Portuguesa', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(portuguesa)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
