import { isClubPreCreated } from '../../Model/Club'
import { guarani } from './guarani'

describe('Club Guarani', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(guarani)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
