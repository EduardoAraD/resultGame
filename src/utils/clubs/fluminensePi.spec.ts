import { isClubPreCreated } from '../../Model/Club'
import { fluminensePi } from './fluminensePi'

describe('Club Fluminense PI', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(fluminensePi)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
