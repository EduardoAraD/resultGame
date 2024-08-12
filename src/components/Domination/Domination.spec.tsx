import { Domination } from '.'
import {
  fireEvent,
  render,
  screen,
} from '../../../__tests__/utils/customRender'

describe('Component: CardMatchResult', () => {
  it('should be render match card in result', () => {
    const onPress = jest.fn()

    render(
      <Domination
        domainClubHome={60}
        domainClubAway={40}
        minute={68}
        velocityOfMatch={3}
        updateVelocityOfMatch={onPress}
      />,
    )

    const touch = screen.getByTestId('touch')
    fireEvent.press(touch)
    expect(onPress).toHaveBeenCalledTimes(1) // vezes foi chamada a função
    expect(screen.getByText("68'")).toBeTruthy()
    expect(screen.getByText('3x')).toBeTruthy()
  })
})
