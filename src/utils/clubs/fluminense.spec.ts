import { isClubPreCreated } from '../../Model/Club'
import { fluminense } from './fluminense'

describe('Club Fluminense', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(fluminense)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
