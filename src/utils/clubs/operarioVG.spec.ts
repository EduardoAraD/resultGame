import { isClubPreCreated } from '../../Model/Club'
import { operarioVG } from './operarioVG'

describe('Club Operario VG', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(operarioVG)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
