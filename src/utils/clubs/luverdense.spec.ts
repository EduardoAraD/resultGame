import { isClubPreCreated } from '../../Model/Club'
import { luverdense } from './luverdense'

describe('Club Luvendense', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(luverdense)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
