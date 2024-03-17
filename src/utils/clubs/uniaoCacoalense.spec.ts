import { isClubPreCreated } from '../../Model/Club'
import { uniaoCacoalense } from './uniaoCacoalense'

describe('Club Uniao Cacoalense', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(uniaoCacoalense)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
