import { isClubPreCreated } from '../../Model/Club'
import { cascavel } from './cascavel'

describe('Club Cascavel', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(cascavel)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
