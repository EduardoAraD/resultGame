import { isClubPreCreated } from '../../Model/Club'
import { motoClub } from './motoClub'

describe('Club Moto Club', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(motoClub)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
