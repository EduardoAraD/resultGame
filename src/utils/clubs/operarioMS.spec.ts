import { isClubPreCreated } from '../../Model/Club'
import { operarioMS } from './operarioMS'

describe('Club Operario MS', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(operarioMS)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
