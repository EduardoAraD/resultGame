import { isClubPreCreated } from '../../Model/Club'
import { sousa } from './sousa'

describe('Club Sousa', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(sousa)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
