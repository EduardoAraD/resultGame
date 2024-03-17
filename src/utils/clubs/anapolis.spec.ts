import { isClubPreCreated } from '../../Model/Club'
import { anapolis } from './anapolis'

describe('Club Anapolis', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(anapolis)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
