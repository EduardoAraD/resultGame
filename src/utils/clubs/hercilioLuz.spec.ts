import { isClubPreCreated } from '../../Model/Club'
import { hercilioLuz } from './hercilioLuz'

describe('Club Hercilio Luz', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(hercilioLuz)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
