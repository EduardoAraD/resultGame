import { isClubPreCreated } from '../../Model/Club'
import { imperatriz } from './imperatriz'

describe('Club Imperatriz', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(imperatriz)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
