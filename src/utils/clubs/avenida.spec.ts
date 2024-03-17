import { isClubPreCreated } from '../../Model/Club'
import { avenida } from './avenida'

describe('Club Avenida', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(avenida)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
