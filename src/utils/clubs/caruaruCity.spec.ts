import { isClubPreCreated } from '../../Model/Club'
import { caruaruCity } from './caruaruCity'

describe('Club Caruaru City', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(caruaruCity)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
