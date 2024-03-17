import { isClubPreCreated } from '../../Model/Club'
import { humaita } from './humaita'

describe('Club Humaitá', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(humaita)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
