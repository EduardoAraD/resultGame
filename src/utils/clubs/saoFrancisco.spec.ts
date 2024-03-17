import { isClubPreCreated } from '../../Model/Club'
import { saoFrancisco } from './saoFrancisco'

describe('Club Sao Francisco', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(saoFrancisco)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
