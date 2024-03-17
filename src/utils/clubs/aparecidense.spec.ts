import { aparecidense } from './aparecidense'

describe('Club Aparecidense', () => {
  it('should be an object of type ClubPreCreated', () => {
    expect(aparecidense).toEqual(
      expect.objectContaining({
        name: 'Aparecidense',
        cod: 13,
      }),
    )
  })
})
