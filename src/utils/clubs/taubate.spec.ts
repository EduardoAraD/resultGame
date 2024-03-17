import { isClubPreCreated } from '../../Model/Club'
import { taubate } from './taubate'

describe('Club Taubate', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(taubate)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
