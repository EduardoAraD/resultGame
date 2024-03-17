import { isClubPreCreated } from '../../Model/Club'
import { interDeLimeira } from './interDeLimeira'

describe('Club Inter de Limeira', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(interDeLimeira)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
