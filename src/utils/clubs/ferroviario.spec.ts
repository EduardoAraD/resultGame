import { isClubPreCreated } from '../../Model/Club'
import { ferroviario } from './ferroviario'

describe('Club Ferroviário', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(ferroviario)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
