import { isClubPreCreated } from '../../Model/Club'
import { tuntum } from './tuntum'

describe('Club Tuntum', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(tuntum)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
