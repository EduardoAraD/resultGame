import { isClubPreCreated } from '../../Model/Club'
import { tocantinopolis } from './tocantinopolis'

describe('Club Tocantinopolis', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(tocantinopolis)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
