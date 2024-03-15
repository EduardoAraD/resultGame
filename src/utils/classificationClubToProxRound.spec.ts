import { ClubShort } from '../Model/Club'
import { emptyStats } from '../Model/Stats'
import { classificationClubToProxRound } from './classificationClubToProxRound'
import { createRoundsCup } from './createRoundsCup'
import { logoClubDefault } from './getDefaultLogoClub'

describe('Function classificationClubToProxRound', () => {
  it('should be one new list of rounds with the update match semi-final ', () => {
    const club1: ClubShort = {
      id: '1',
      name: 'Club Test 1',
      logo: logoClubDefault,
      isCreatedOnUser: false,
      isDisabled: false,
    }

    const roundsOld = createRoundsCup({
      clubs: [club1, club1, club1, club1],
      hasThirdPlace: false,
      hasMatchTrip: false,
    })
    roundsOld[1].matchs[0].idStats = 'match-0'

    const newRounds = classificationClubToProxRound({
      match: {
        home: club1,
        away: club1,
        stats: {
          homeStats: emptyStats,
          awayStats: { ...emptyStats, goal: 2 },
          id: 'match-0',
          type: 'knockout stage',
          status: 'finished',
        },
      },
      rounds: roundsOld,
    })

    expect(newRounds.length).toBe(2)
    expect(newRounds[0].cod).toBe('final')
    expect(newRounds[0].matchs[0].homeIdClub).toBe(club1.id)
  })
  it('should be one new list of rounds with the update match semi-final with third place', () => {
    const club1: ClubShort = {
      id: '1',
      name: 'Club Test 1',
      logo: logoClubDefault,
      isCreatedOnUser: false,
      isDisabled: false,
    }
    const club2: ClubShort = {
      id: '2',
      name: 'Club Test 2',
      logo: logoClubDefault,
      isCreatedOnUser: false,
      isDisabled: false,
    }

    const roundsOld = createRoundsCup({
      clubs: [club1, club1, club1, club1],
      hasThirdPlace: true,
      hasMatchTrip: false,
    })
    roundsOld[2].matchs[1].idStats = 'match-0'

    const newRounds = classificationClubToProxRound({
      match: {
        home: club1,
        away: club2,
        stats: {
          homeStats: emptyStats,
          awayStats: { ...emptyStats, goal: 2 },
          id: 'match-0',
          type: 'knockout stage',
          status: 'finished',
        },
      },
      rounds: roundsOld,
    })

    expect(newRounds.length).toBe(3)
    expect(newRounds[0].cod).toBe('final')
    expect(newRounds[0].matchs[0].awayIdClub).toBe(club2.id)
    expect(newRounds[1].cod).toBe('third')
    expect(newRounds[1].matchs[0].awayIdClub).toBe(club1.id)
  })
  it('should be one new list of rounds with the update match in cod different semi, third or final', () => {
    const club1: ClubShort = {
      id: '1',
      name: 'Club Test 1',
      logo: logoClubDefault,
      isCreatedOnUser: false,
      isDisabled: false,
    }
    const club2: ClubShort = {
      id: '2',
      name: 'Club Test 2',
      logo: logoClubDefault,
      isCreatedOnUser: false,
      isDisabled: false,
    }

    const roundsOld = createRoundsCup({
      clubs: [club1, club1, club1, club1, club1],
      hasThirdPlace: false,
      hasMatchTrip: false,
    })
    roundsOld[2].matchs[0].idStats = 'match-0'
    roundsOld[2].matchs[0].awayIdClub = club2.id

    const newRounds = classificationClubToProxRound({
      match: {
        home: club1,
        away: club2,
        stats: {
          homeStats: emptyStats,
          awayStats: { ...emptyStats, goal: 1 },
          id: 'match-0',
          type: 'knockout stage',
          status: 'finished',
        },
      },
      rounds: roundsOld,
    })

    expect(newRounds.length).toBe(3)
    expect(newRounds[1].matchs[0].homeIdClub).toBe(club2.id)
  })
})
