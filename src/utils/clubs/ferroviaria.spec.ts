import { isClubPreCreated } from '../../Model/Club'
import { ferroviaria } from './ferroviaria'

describe('Club Ferroviária', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(ferroviaria)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
