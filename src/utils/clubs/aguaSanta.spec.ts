import { isClubPreCreated } from '../../Model/Club'
import { aguaSanta } from './aguaSanta'

describe('Club Agua Santa', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(aguaSanta)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
