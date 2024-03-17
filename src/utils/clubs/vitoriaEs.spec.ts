import { isClubPreCreated } from '../../Model/Club'
import { vitoriaES } from './vitoriaEs'

describe('Club Vitoria ES', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(vitoriaES)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
