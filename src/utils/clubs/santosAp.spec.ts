import { isClubPreCreated } from '../../Model/Club'
import { santosAp } from './santosAp'

describe('Club Santos AP', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(santosAp)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
