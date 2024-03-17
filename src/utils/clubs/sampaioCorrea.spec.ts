import { isClubPreCreated } from '../../Model/Club'
import { sampaioCorrea } from './sampaioCorrea'

describe('Club Sampaio Correa', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(sampaioCorrea)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
