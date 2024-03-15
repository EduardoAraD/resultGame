import { ClubShort } from '../Model/Club'
import { createRoundsCup } from './createRoundsCup'
import { logoClubDefault } from './getDefaultLogoClub'

describe('Function createRoundCup', () => {
  it('should be create one list in rounds of cup by list clubs', () => {
    const club1: ClubShort = {
      id: '0',
      name: 'Club Test 1',
      logo: logoClubDefault,
      isCreatedOnUser: false,
      isDisabled: false,
    }

    const roundOfCup = createRoundsCup({
      clubs: [club1, club1, club1, club1],
      hasThirdPlace: false,
      hasMatchTrip: true,
    })

    expect(roundOfCup.length).toBe(2)
    expect(roundOfCup[0].cod).toBe('final')
    expect(roundOfCup[1].cod).toBe('semi')
    expect(roundOfCup[1].matchs[0].idStatsTrip).not.toBe(undefined)
  })

  it('should be create one list in rounds of cup by list clubs and third place', () => {
    const club1: ClubShort = {
      id: '0',
      name: 'Club Test 1',
      logo: logoClubDefault,
      isCreatedOnUser: false,
      isDisabled: false,
    }

    const roundOfLeague = createRoundsCup({
      clubs: [
        club1,
        club1,
        club1,
        club1,
        club1,
        club1,
        club1,
        club1,
        club1,
        club1,
        club1,
        club1,
        club1,
        club1,
        club1,
        club1,
        club1, // 109
      ],
      hasThirdPlace: true,
      hasMatchTrip: false,
    })

    expect(roundOfLeague.length).toBe(6)
    expect(roundOfLeague[0].cod).toBe('final')
    expect(roundOfLeague[1].cod).toBe('third')
    expect(roundOfLeague[2].cod).toBe('semi')
    expect(roundOfLeague[3].cod).toBe('quarter')
    expect(roundOfLeague[4].cod).toBe('round of 16')
    expect(roundOfLeague[5].cod).toBe('knockout stage')
  })
})
