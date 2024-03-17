import { isClubPreCreated } from '../../Model/Club'
import { realNoroeste } from './realNoroeste'

describe('Club Real Noroeste', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(realNoroeste)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
