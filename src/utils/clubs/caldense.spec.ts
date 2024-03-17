import { isClubPreCreated } from '../../Model/Club'
import { caldense } from './caldense'

describe('Club Caldense', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(caldense)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
