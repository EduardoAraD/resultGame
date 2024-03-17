import { isClubPreCreated } from '../../Model/Club'
import { cruzeiroAl } from './cruzeiroAl'

describe('Club Cruzeiro AL', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(cruzeiroAl)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
