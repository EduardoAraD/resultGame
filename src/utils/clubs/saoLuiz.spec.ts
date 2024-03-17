import { isClubPreCreated } from '../../Model/Club'
import { saoLuizRS } from './saoLuiz'

describe('Club Sao Luiz', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(saoLuizRS)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
