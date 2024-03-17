import { isClubPreCreated } from '../../Model/Club'
import { altos } from './altos'

describe('Club Altos', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(altos)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
