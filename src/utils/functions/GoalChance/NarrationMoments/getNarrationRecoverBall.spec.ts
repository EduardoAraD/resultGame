import { getNarrationRecoverBall } from './getNarrationRecoverBall'

describe('Function getNarrationRecoverBall', () => {
  it('should be return a narration', () => {
    const narration = getNarrationRecoverBall()

    expect(narration).toEqual(expect.any(String))
  })
})
