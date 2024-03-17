import { isClubPreCreated } from '../../Model/Club'
import { chapecoense } from './chapecoense'

describe('Club Chapecoense', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(chapecoense)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
