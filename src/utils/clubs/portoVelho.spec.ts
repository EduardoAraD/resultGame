import { isClubPreCreated } from '../../Model/Club'
import { portoVelho } from './portoVelho'

describe('Club Porto Velho', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(portoVelho)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
