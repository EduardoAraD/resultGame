import { isClubPreCreated } from '../../Model/Club'
import { acao } from './acao'

describe('Club Ação F', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(acao)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
