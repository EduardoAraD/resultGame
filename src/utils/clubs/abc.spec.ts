import { isClubPreCreated } from '../../Model/Club'
import { abc } from './abc'

describe('Club ABC', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(abc)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
