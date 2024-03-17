import { isClubPreCreated } from '../../Model/Club'
import { ipora } from './ipora'

describe('Club Ipora', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(ipora)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
