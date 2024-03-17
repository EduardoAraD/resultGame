import { isClubPreCreated } from '../../Model/Club'
import { ipatinga } from './ipatinga'

describe('Club Ipatinga', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(ipatinga)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
