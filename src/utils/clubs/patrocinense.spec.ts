import { isClubPreCreated } from '../../Model/Club'
import { patrocinense } from './patrocinense'

describe('Club Patrocinense', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(patrocinense)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
