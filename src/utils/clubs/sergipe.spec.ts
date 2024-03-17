import { isClubPreCreated } from '../../Model/Club'
import { sergipe } from './sergipe'

describe('Club Sergipe', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(sergipe)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
