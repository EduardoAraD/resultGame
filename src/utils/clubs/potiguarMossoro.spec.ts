import { isClubPreCreated } from '../../Model/Club'
import { potiguarDeMossoro } from './potiguarMossoro'

describe('Club Potiguar', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(potiguarDeMossoro)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
