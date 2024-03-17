import { isClubPreCreated } from '../../Model/Club'
import { avai } from './avai'

describe('Club Avai', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(avai)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
