import { isClubPreCreated } from '../../Model/Club'
import { novaIguacu } from './novaIguacu'

describe('Club Nova Iguacu', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(novaIguacu)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
