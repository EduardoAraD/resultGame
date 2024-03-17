import { isClubPreCreated } from '../../Model/Club'
import { parnahyba } from './parnahyba'

describe('Club Parnahyba', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(parnahyba)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
