import { isClubPreCreated } from '../../Model/Club'
import { vilaNovaMG } from './vilaNovaMg'

describe('Club Villa Nova MG', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(vilaNovaMG)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
