import { isClubPreCreated } from '../../Model/Club'
import { capital } from './capitalTo'

describe('Club Capital TO', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(capital)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
