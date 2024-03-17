import { isClubPreCreated } from '../../Model/Club'
import { falcon } from './falcon'

describe('Club Falcon', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(falcon)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
