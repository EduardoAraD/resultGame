import { isClubPreCreated } from '../../Model/Club'
import { novaVenecia } from './novaVenecia'

describe('Club Nova Venecia', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(novaVenecia)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
