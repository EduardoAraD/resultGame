import { isClubPreCreated } from '../../Model/Club'
import { realAriquemes } from './realAriquemes'

describe('Club Real Ariquemes', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(realAriquemes)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
