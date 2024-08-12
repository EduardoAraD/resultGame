import { getNarrationStrongLauch } from './getNarrationStrongLauch'

describe('Function getNarrationStrongLauch', () => {
  it('should be return a narration', () => {
    const narration = getNarrationStrongLauch()

    expect(narration).toEqual(expect.any(String))
  })
})
