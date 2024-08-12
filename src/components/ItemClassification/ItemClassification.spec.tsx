import { ItemClassificationComponent } from '.'
import { render, screen } from '../../../__tests__/utils/customRender'
import { ItemClassification } from '../../Model/ItemClassification'
import { emptyClub } from '../../Model/Club'

describe('Component: ItemClassification', () => {
  it('should be render item in classification', () => {
    const item: ItemClassification = {
      club: { ...emptyClub, name: 'Club Test' },
      points: 0,
      win: 0,
      games: 1,
      goalsConceded: 2,
      goalsScored: 1,
      type: 'promotion',
    }

    render(
      <ItemClassificationComponent itemClassification={item} position={1} />,
    )

    expect(screen.getByText('Club Test')).toBeTruthy()
  })

  it('should be render item in classification', () => {
    const item: ItemClassification = {
      club: { ...emptyClub, name: 'Club Test' },
      points: 0,
      win: 0,
      games: 1,
      goalsConceded: 2,
      goalsScored: 1,
      type: 'relegation',
    }

    render(
      <ItemClassificationComponent itemClassification={item} position={1} />,
    )

    expect(screen.getByText('Club Test')).toBeTruthy()
  })

  it('should be render item in classification', () => {
    const item: ItemClassification = {
      club: { ...emptyClub, name: 'Club Test' },
      points: 0,
      win: 0,
      games: 1,
      goalsConceded: 2,
      goalsScored: 1,
      type: 'standard',
    }

    render(
      <ItemClassificationComponent itemClassification={item} position={1} />,
    )

    expect(screen.getByText('Club Test')).toBeTruthy()
  })
})
