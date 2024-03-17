import { isClubPreCreated } from '../../Model/Club'
import { marcilioDias } from './marcilioDias'

describe('Club Marcilio Dias', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(marcilioDias)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
