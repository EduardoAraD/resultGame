import { isClubPreCreated } from '../../Model/Club'
import { vilaNova } from './vilaNova'

describe('Club Vila Nova', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(vilaNova)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
