import { isClubPreCreated } from '../../Model/Club'
import { cuiaba } from './cuiaba'

describe('Club Cuiaba', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(cuiaba)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
