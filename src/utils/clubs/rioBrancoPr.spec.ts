import { isClubPreCreated } from '../../Model/Club'
import { rioBrancoPR } from './rioBrancoPr'

describe('Club Rio Branco PR', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(rioBrancoPR)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
