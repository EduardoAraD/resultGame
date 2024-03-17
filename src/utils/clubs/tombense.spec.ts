import { isClubPreCreated } from '../../Model/Club'
import { tombense } from './tombense'

describe('Club Tombense', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(tombense)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
