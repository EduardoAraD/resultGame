import { isClubPreCreated } from '../../Model/Club'
import { camboriu } from './camboriu'

describe('Club Camboriu', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(camboriu)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
