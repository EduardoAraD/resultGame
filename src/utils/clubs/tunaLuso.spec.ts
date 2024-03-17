import { isClubPreCreated } from '../../Model/Club'
import { tunaLuso } from './tunaLuso'

describe('Club Tuna Luso', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(tunaLuso)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
