import { isClubPreCreated } from '../../Model/Club'
import { uniaoRondonopolis } from './uniaoRondonopolis'

describe('Club Uniao Rondonopolis', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(uniaoRondonopolis)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
