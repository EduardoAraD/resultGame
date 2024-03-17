import { isClubPreCreated } from '../../Model/Club'
import { linense } from './linense'

describe('Club Linense', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(linense)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
