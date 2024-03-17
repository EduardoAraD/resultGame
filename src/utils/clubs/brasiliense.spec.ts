import { isClubPreCreated } from '../../Model/Club'
import { brasiliense } from './brasiliense'

describe('Club Brasiliense', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(brasiliense)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
