import { isClubPreCreated } from '../../Model/Club'
import { nacionalAm } from './nacionalAm'

describe('Club Nacional AM', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(nacionalAm)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
