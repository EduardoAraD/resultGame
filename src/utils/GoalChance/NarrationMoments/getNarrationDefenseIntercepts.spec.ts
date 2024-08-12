import { getNarrationDefenseIntercepts } from './getNarrationDefenseIntercepts'

describe('Function getNarrationDefenseIntercepts', () => {
  it('should be return a narration', () => {
    const narration = getNarrationDefenseIntercepts()

    expect(narration).toEqual(expect.any(String))
  })
})
