import { isClubPreCreated } from '../../Model/Club'
import { mirassol } from './mirassol'

describe('Club Mirassol', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(mirassol)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
