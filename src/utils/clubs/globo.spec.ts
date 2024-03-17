import { isClubPreCreated } from '../../Model/Club'
import { globoFc } from './globo'

describe('Club Globo', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(globoFc)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
