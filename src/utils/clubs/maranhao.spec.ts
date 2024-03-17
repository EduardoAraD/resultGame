import { isClubPreCreated } from '../../Model/Club'
import { maranhao } from './maranhao'

describe('Club Maranhao', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(maranhao)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
