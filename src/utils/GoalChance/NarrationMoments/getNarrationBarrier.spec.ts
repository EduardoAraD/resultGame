import { getNarrationBarrier } from './getNarrationBarrier'

describe('Function getNarrationBallGoalkeeper', () => {
  it('should be return a narration', () => {
    const narration = getNarrationBarrier()

    expect(narration).toBe('A bola ficou na barreira.')
  })
})
