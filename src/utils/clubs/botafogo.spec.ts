import { isClubPreCreated } from '../../Model/Club'
import { botafogo } from './botafogo'

describe('Club Botafogo', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(botafogo)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
