import { isClubPreCreated } from '../../Model/Club'
import { corinthians } from './corinthians'

describe('Club Corinthians', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(corinthians)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
