import { CardCup } from '.'
import { render, screen } from '../../../__tests__/utils/customRender'
import { CupShort } from '../../Model/Cup'

describe('Component: CardCup', () => {
  it('should be render club of type cup', () => {
    const cup: CupShort = {
      id: '1',
      name: 'Cup Test',
      numberClubs: 16,
      type: 'cup',
      status: 'progress',
    }

    render(<CardCup cup={cup} />)

    expect(screen.getByText('Cup Test')).toBeTruthy()
    expect(screen.getByText('Copa')).toBeTruthy()
    expect(screen.getByText('16 clubes')).toBeTruthy()
  })

  it('should be render club of type league', () => {
    const cup: CupShort = {
      id: '1',
      name: 'Cup Test',
      numberClubs: 10,
      type: 'league',
      status: 'start',
    }

    render(<CardCup cup={cup} />)

    expect(screen.getByText('Cup Test')).toBeTruthy()
    expect(screen.getByText('Liga')).toBeTruthy()
    expect(screen.getByText('10 clubes')).toBeTruthy()
  })

  it('should be render club of stats equal closed', () => {
    const cup: CupShort = {
      id: '1',
      name: 'Cup Test',
      numberClubs: 10,
      type: 'league',
      status: 'closed',
    }

    render(<CardCup cup={cup} />)

    expect(screen.getByText('Cup Test')).toBeTruthy()
    expect(screen.getByText('Liga')).toBeTruthy()
    expect(screen.getByText('10 clubes')).toBeTruthy()
  })
})
