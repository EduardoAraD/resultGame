import { isClubPreCreated } from '../../Model/Club'
import { cianorte } from './cianorte'

describe('Club Cianorte', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(cianorte)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
