import { isClubPreCreated } from '../../Model/Club'
import { portuguesaRJ } from './portuguesaRj'

describe('Club Portuguesa RJ', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(portuguesaRJ)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
