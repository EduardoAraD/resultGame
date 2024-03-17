import { isClubPreCreated } from '../../Model/Club'
import { castanhal } from './castanhal'

describe('Club Castanhal', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(castanhal)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
