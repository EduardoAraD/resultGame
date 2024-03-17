import { isClubPreCreated } from '../../Model/Club'
import { operarioPR } from './operarioPr'

describe('Club Operario PR', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(operarioPR)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
