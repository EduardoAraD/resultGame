import { isClubPreCreated } from '../../Model/Club'
import { itabaiana } from './itabaiana'

describe('Club Itabaiana', () => {
  it('should be an object of type ClubPreCreated', () => {
    const isTypeOfClubPreCreated = isClubPreCreated(itabaiana)
    expect(isTypeOfClubPreCreated).toBe(true)
  })
})
