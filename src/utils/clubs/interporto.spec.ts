import { isClubPreCreated } from '../../Model/Club'
import { interporto } from './interporto'

describe('Club Interporto', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(interporto)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
