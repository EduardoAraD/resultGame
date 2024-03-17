import { isClubPreCreated } from '../../Model/Club'
import { fortaleza } from './fortaleza'

describe('Club Fortaleza', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(fortaleza)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
