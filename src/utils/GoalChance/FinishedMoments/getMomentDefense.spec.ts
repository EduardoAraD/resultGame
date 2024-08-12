import { getMomentsDefensePlay } from './getMomentDefense'

describe('Function getMomentDefense', () => {
  it('should be return one updated domain for defense partial', () => {
    const moment = getMomentsDefensePlay({
      minute: 90,
      defense: 'partial',
      domain: {
        away: 85,
        home: 15,
      },
      homeOrAway: 'away',
      type: 'DEFENSE',
    })

    expect(moment).toEqual(
      expect.objectContaining({ domainAway: 75, domainHome: 25 }),
    )
  })

  it('should be return one updated domain for defense completed', () => {
    const moment = getMomentsDefensePlay({
      minute: 90,
      defense: 'completed',
      domain: {
        away: 15,
        home: 85,
      },
      homeOrAway: 'home',
      type: 'DEFENSE',
    })

    expect(moment).toEqual(
      expect.objectContaining({ domainAway: 45, domainHome: 55 }),
    )
  })
})
