import { isClubPreCreated } from '../../Model/Club'
import { novoHamburgo } from './novoHamburgo'

describe('Club Novo Hamburgo', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(novoHamburgo)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
