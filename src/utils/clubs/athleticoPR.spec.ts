import { isClubPreCreated } from '../../Model/Club'
import { athleticoParanaense } from './athleticoPR'

describe('Club Athletico Pr', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(athleticoParanaense)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
