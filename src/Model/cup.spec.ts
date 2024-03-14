import { emptyCupComplete } from './Cup'

describe('Model Cup', () => {
  it('should be un object CupComplete with values default', () => {
    expect(emptyCupComplete.hasThirdPlace).toEqual(false)
    expect(emptyCupComplete.id).toEqual('')
    expect(emptyCupComplete.idsClubsParticipating).toEqual([])
    expect(emptyCupComplete.isRoundTrip).toEqual(false)
    expect(emptyCupComplete.name).toEqual('')
    expect(emptyCupComplete.numberClubs).toEqual(0)
    expect(emptyCupComplete.numberClubsPromoted).toEqual(0)
    expect(emptyCupComplete.numberClubsRelegated).toEqual(0)
    expect(emptyCupComplete.pointsForDraw).toEqual(0)
    expect(emptyCupComplete.pointsForLoss).toEqual(0)
    expect(emptyCupComplete.pointsForWin).toEqual(0)
    expect(emptyCupComplete.status).toEqual('start')
    expect(emptyCupComplete.type).toEqual('league')
  })
})
