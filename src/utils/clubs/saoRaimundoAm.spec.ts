import { isClubPreCreated } from '../../Model/Club'
import { saoRaimundoAM } from './saoRaimundoAm'

describe('Club Sao Raimundo AM', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(saoRaimundoAM)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
