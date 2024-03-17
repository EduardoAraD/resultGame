import { isClubPreCreated } from '../../Model/Club'
import { remo } from './remo'

describe('Club Remo', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(remo)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
