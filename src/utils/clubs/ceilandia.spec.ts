import { isClubPreCreated } from '../../Model/Club'
import { ceilandia } from './ceilandia'

describe('Club Ceilândia', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(ceilandia)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
