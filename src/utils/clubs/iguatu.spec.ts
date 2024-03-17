import { isClubPreCreated } from '../../Model/Club'
import { iguatu } from './iguatu'

describe('Club Iguatu', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(iguatu)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
