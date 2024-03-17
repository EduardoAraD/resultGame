import { isClubPreCreated } from '../../Model/Club'
import { flamengo } from './flamengo'

describe('Club Flamengo', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(flamengo)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
