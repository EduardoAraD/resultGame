import { getNarrationStrongLauchSide } from './getNarrationStrongLauchSide'

describe('Function getNarrationStrongLauchSide', () => {
  it('should be return a narration', () => {
    const narration = getNarrationStrongLauchSide()

    expect(narration).toEqual(expect.any(String))
  })
})
