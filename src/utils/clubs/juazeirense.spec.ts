import { isClubPreCreated } from '../../Model/Club'
import { juazeirense } from './juazeirense'

describe('Club Juazeirense', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(juazeirense)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
