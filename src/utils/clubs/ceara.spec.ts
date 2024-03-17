import { isClubPreCreated } from '../../Model/Club'
import { ceara } from './ceara'

describe('Club Ceará', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(ceara)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
