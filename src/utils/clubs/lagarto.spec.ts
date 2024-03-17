import { isClubPreCreated } from '../../Model/Club'
import { lagarto } from './lagarto'

describe('Club Lagarto', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(lagarto)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
