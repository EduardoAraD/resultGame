import { isClubPreCreated } from '../../Model/Club'
import { quatroDeJulho } from './4dejulho'

describe('Club 4 de Julho', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(quatroDeJulho)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
