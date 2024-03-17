import { isClubPreCreated } from '../../Model/Club'
import { aguiaDeMaraba } from './aguiaDeMaraba'

describe('Club Aguia de Maraba', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(aguiaDeMaraba)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
