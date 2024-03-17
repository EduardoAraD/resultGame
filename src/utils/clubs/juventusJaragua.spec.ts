import { isClubPreCreated } from '../../Model/Club'
import { juventusDeJaragua } from './juventusJaragua'

describe('Club Juventude Jaragua', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(juventusDeJaragua)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
