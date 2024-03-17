import { isClubPreCreated } from '../../Model/Club'
import { santoAndre } from './santoAndre'

describe('Club Santo Andre', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(santoAndre)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
