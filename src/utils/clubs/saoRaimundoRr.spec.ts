import { isClubPreCreated } from '../../Model/Club'
import { saoRaimundoRr } from './saoRaimundoRr'

describe('Club Sao Raimundo RR', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(saoRaimundoRr)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
