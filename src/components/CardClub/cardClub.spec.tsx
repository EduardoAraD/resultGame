import { CardClub } from '.'
import { render, screen } from '../../../__tests__/utils/customRender'
import { ClubShort } from '../../Model/Club'
import { logoClubDefault } from '../../utils/getDefaultLogoClub'

describe('Component: CardClub', () => {
  it('should be render card club', () => {
    const club: ClubShort = {
      id: '1',
      name: 'Club Test',
      logo: logoClubDefault,
      isDisabled: false,
      isCreatedOnUser: false,
    }

    render(<CardClub club={club} />)

    expect(screen.getByText('Club Test')).toBeTruthy()
  })

  it('should be render card club with isDisabled is true', () => {
    const club: ClubShort = {
      id: '1',
      name: 'Club Test',
      logo: logoClubDefault,
      isDisabled: true,
      isCreatedOnUser: false,
    }

    render(<CardClub club={club} />)

    const selected = screen.getByTestId('disabled')
    expect(screen.getByText('Club Test')).toBeTruthy()
    expect(selected).toBeTruthy()
  })

  it('should be render card club with isCreatedOnUser is true', () => {
    const club: ClubShort = {
      id: '1',
      name: 'Club Test',
      logo: logoClubDefault,
      isDisabled: false,
      isCreatedOnUser: true,
    }

    render(<CardClub club={club} />)

    const created = screen.getByTestId('created')
    expect(screen.getByText('Club Test')).toBeTruthy()
    expect(created).toBeTruthy()
  })

  it('should be render card club with check', () => {
    const club: ClubShort = {
      id: '1',
      name: 'Club Test',
      logo: logoClubDefault,
      isDisabled: false,
      isCreatedOnUser: false,
    }

    render(<CardClub club={club} showCheck />)
    const check = screen.getByTestId('check')

    expect(screen.getByText('Club Test')).toBeTruthy()
    expect(check.children).toHaveLength(0)
  })

  it('should be render card club with check selected', () => {
    const club: ClubShort = {
      id: '1',
      name: 'Club Test',
      logo: logoClubDefault,
      isDisabled: false,
      isCreatedOnUser: false,
    }

    render(<CardClub club={club} showCheck isSelected />)
    const check = screen.getByTestId('check')

    expect(screen.getByText('Club Test')).toBeTruthy()
    expect(check.children).toHaveLength(1)
  })
})
