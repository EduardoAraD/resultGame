import { isClubPreCreated } from '../../Model/Club'
import { vasco } from './vasco'

describe('Club Vasco', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(vasco)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
