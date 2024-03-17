import { isClubPreCreated } from '../../Model/Club'
import { botafogoPB } from './botafogoPb'

describe('Club Botafogo PB', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(botafogoPB)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
