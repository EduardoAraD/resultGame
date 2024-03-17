import { isClubPreCreated } from '../../Model/Club'
import { cruzeiro } from './cruzeiro'

describe('Club Cruzeiro', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(cruzeiro)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
