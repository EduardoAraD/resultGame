import { isClubPreCreated } from '../../Model/Club'
import { voltaRedonda } from './voltaRedonda'

describe('Club Volta Redonda', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(voltaRedonda)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
