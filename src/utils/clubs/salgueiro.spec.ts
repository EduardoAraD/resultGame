import { isClubPreCreated } from '../../Model/Club'
import { salgueiro } from './salgueiro'

describe('Club Salgueiro', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(salgueiro)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
