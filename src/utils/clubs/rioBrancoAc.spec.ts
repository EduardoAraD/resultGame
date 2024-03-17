import { isClubPreCreated } from '../../Model/Club'
import { rioBrancoAC } from './rioBrancoAc'

describe('Club Rio Branco AC', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(rioBrancoAC)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
