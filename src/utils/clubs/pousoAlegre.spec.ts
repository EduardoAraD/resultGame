import { isClubPreCreated } from '../../Model/Club'
import { pousoAlegre } from './pousoAlegre'

describe('Club Pouso Alegre', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(pousoAlegre)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
