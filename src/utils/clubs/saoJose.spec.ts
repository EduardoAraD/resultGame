import { isClubPreCreated } from '../../Model/Club'
import { saoJose } from './saoJose'

describe('Club Sao Jose', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(saoJose)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
