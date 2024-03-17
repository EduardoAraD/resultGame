import { isClubPreCreated } from '../../Model/Club'
import { figueirense } from './figueirense'

describe('Club Figueirense', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(figueirense)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
