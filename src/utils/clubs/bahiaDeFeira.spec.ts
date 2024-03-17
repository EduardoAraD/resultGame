import { isClubPreCreated } from '../../Model/Club'
import { bahiaDeFeira } from './bahiaDeFeira'

describe('Club Bahia de Feira', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(bahiaDeFeira)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
