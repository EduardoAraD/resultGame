import { isClubPreCreated } from '../../Model/Club'
import { caxias } from './caxias'

describe('Club Caxias', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(caxias)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
