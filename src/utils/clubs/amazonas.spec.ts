import { isClubPreCreated } from '../../Model/Club'
import { amazonas } from './amazonas'

describe('Club Amazonas', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(amazonas)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
