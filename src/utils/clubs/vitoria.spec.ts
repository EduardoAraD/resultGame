import { isClubPreCreated } from '../../Model/Club'
import { vitoria } from './vitoria'

describe('Club Vitoria', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(vitoria)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
