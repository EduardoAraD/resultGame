import { isClubPreCreated } from '../../Model/Club'
import { aquidauanense } from './aquidauanense'

describe('Club Aquidauanense', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(aquidauanense)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
