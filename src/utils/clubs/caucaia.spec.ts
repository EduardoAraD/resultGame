import { isClubPreCreated } from '../../Model/Club'
import { caucaia } from './caucaia'

describe('Club Caucaia', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(caucaia)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
