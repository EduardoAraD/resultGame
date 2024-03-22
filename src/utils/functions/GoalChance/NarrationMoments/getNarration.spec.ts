import { getNarration } from './getNarration'

describe('Function getNarrationBallGoalkeeper', () => {
  it('should be return a narration in type DEFENSE', () => {
    const narration = getNarration({ type: 'DEFENSE' })

    expect(narration).toEqual(expect.any(String))
  })

  it('should be return a narration in type DEFENSE GOALKEEPER', () => {
    const narration = getNarration({ type: 'DEFENSE GOALKEEPER' })

    expect(narration).toEqual(expect.any(String))
  })

  it('should be return a narration in type GOALKEEPER', () => {
    const narration = getNarration({ type: 'GOALKEEPER' })

    expect(narration).toEqual(expect.any(String))
  })

  it('should be return a narration in type HOLD GOALKEEPER', () => {
    const narration = getNarration({ type: 'HOLD GOALKEEPER' })

    expect(narration).toEqual(expect.any(String))
  })

  it('should be return a narration in type KICK BLOCKED', () => {
    const narration = getNarration({ type: 'KICK BLOCKED' })

    expect(narration).toEqual(expect.any(String))
  })

  it('should be return a narration in type KICK OUT', () => {
    const narration = getNarration({ type: 'KICK OUT' })

    expect(narration).toEqual(expect.any(String))
  })

  it('should be return a narration in type WRONG PASS', () => {
    const narration = getNarration({ type: 'WRONG PASS' })

    expect(narration).toEqual(expect.any(String))
  })

  it('should be return a narration in type BARRIER', () => {
    const narration = getNarration({ type: 'BARRIER' })

    expect(narration).toEqual(expect.any(String))
  })

  it('should be return a narration in type RECOVER BALL', () => {
    const narration = getNarration({ type: 'RECOVER BALL' })

    expect(narration).toEqual(expect.any(String))
  })

  it('should be return a narration in type STRONG LAUNCH', () => {
    const narration = getNarration({ type: 'STRONG LAUNCH' })

    expect(narration).toEqual(expect.any(String))
  })

  it('should be return a narration in type DEFENSE INTERCEPTS', () => {
    const narration = getNarration({ type: 'DEFENSE INTERCEPTS' })

    expect(narration).toEqual(expect.any(String))
  })

  it('should be return a narration in type STRONG LAUNCH SIDE', () => {
    const narration = getNarration({ type: 'STRONG LAUNCH SIDE' })

    expect(narration).toEqual(expect.any(String))
  })
})
