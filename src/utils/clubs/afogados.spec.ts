import { isClubPreCreated } from '../../Model/Club'
import { afogados } from './afogados'

describe('Club Afogados', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(afogados)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
