import { isClubPreCreated } from '../../Model/Club'
import { juventusSp } from './juventusSp'

describe('Club Juventus SP', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(juventusSp)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
