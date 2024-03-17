import { isClubPreCreated } from '../../Model/Club'
import { retro } from './retro'

describe('Club Retro', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(retro)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
