import { isClubPreCreated } from '../../Model/Club'
import { lemense } from './lemense'

describe('Club Lemense', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(lemense)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
