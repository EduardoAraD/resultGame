import { isClubPreCreated } from '../../Model/Club'
import { campinense } from './campinense'

describe('Club Campinense', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(campinense)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
