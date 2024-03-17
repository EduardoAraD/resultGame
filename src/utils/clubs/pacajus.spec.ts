import { isClubPreCreated } from '../../Model/Club'
import { pacajus } from './pacajus'

describe('Club Pacajus', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(pacajus)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
