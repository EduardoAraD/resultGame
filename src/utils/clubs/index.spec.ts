import { clubsPreCreated } from '.'

describe('Clubs All', () => {
  it('should be one list in clubs', () => {
    expect(clubsPreCreated.length).toBe(188)
  })
})
