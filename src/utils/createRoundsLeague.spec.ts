import { ClubShort } from '../Model/Club'
import { createRoundsLeague } from './createRoundsLeague'
import { logoClubDefault } from './getDefaultLogoClub'

describe('Function createRoundMatch', () => {
  it('should be create one list in rounds of league by list clubs', () => {
    const club1: ClubShort = {
      id: '0',
      name: 'Club Test 1',
      logo: logoClubDefault,
      isCreatedOnUser: false,
      isDisabled: false,
    }
    const club2: ClubShort = {
      id: '1',
      name: 'Club Test 2',
      logo: logoClubDefault,
      isCreatedOnUser: false,
      isDisabled: false,
    }
    const club3: ClubShort = {
      id: '2',
      name: 'Club Test 3',
      logo: logoClubDefault,
      isCreatedOnUser: false,
      isDisabled: false,
    }
    const club4: ClubShort = {
      id: '3',
      name: 'Club Test 4',
      logo: logoClubDefault,
      isCreatedOnUser: false,
      isDisabled: false,
    }

    const roundOfLeague = createRoundsLeague([club1, club2, club3, club4])

    expect(roundOfLeague.length).toBe(3)
    expect(roundOfLeague[0].matchs.length).toBe(2)
    expect(roundOfLeague[1].matchs.length).toBe(2)
    expect(roundOfLeague[2].matchs.length).toBe(2)
  })
})
