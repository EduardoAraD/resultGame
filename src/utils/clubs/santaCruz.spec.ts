import { isClubPreCreated } from '../../Model/Club'
import { santaCruz } from './santaCruz'

describe('Club Santa Cruz', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(santaCruz)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
