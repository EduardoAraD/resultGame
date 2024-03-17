import { isClubPreCreated } from '../../Model/Club'
import { americaRn } from './americaRn'

describe('Club America RN', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(americaRn)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
