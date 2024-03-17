import { isClubPreCreated } from '../../Model/Club'
import { americaMG } from './americaMg'

describe('Club America Mg', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(americaMG)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
