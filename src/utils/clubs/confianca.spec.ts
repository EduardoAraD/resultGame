import { isClubPreCreated } from '../../Model/Club'
import { confianca } from './confianca'

describe('Club Confiança', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(confianca)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
