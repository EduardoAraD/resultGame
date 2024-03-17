import { isClubPreCreated } from '../../Model/Club'
import { azuriz } from './azuriz'

describe('Club Azuriz', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(azuriz)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
