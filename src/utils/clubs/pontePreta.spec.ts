import { isClubPreCreated } from '../../Model/Club'
import { pontePreta } from './pontePreta'

describe('Club Ponte Preta', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(pontePreta)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
