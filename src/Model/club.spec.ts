import { emptyClub, emptyClubComplete } from './Club'
import defaultLogo from '../assets/logos/escudo_cinza.png'

describe('Model Club', () => {
  it('should be un object ClubShort with values initials', () => {
    expect(emptyClub.id).toEqual('')
    expect(emptyClub.name).toEqual('')
    expect(emptyClub.logo).toEqual(defaultLogo)
    expect(emptyClub.isDisabled).toEqual(false)
    expect(emptyClub.isCreatedOnUser).toEqual(false)
  })

  it('should be un object ClubComplete with values initials', () => {
    expect(emptyClubComplete.acronym).toEqual('')
    expect(emptyClubComplete.nameComplete).toEqual('')
    expect(emptyClubComplete.overall).toEqual(0)
    expect(emptyClubComplete.stadium).toEqual({
      nameComplete: '',
    })
  })
})
