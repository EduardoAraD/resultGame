import { CardClubAward } from '.'
import { render, screen } from '../../../__tests__/utils/customRender'
import { ClubShort, emptyClub } from '../../Model/Club'

describe('Component: CardClubAward', () => {
  it('should be render card club award', () => {
    const club: ClubShort = { ...emptyClub, name: 'Club Test' }

    render(<CardClubAward title="Title test" clubs={[club]} />)

    expect(screen.getByText('Title test')).toBeTruthy()
    expect(screen.getByText('Club Test')).toBeTruthy()
    expect(screen.getByTestId('card').children).toHaveLength(2)
  })

  it('should be render undefined club', () => {
    render(<CardClubAward title="Title test" clubs={[undefined, undefined]} />)

    expect(screen.getByText('Title test')).toBeTruthy()
    expect(screen.getAllByText('A definir')).toHaveLength(2)
    expect(screen.getByTestId('card').children).toHaveLength(3)
  })
})
