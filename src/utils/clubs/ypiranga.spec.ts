import { isClubPreCreated } from '../../Model/Club'
import { ypiranga } from './ypiranga'

describe('Club Ypiranga', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(ypiranga)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
