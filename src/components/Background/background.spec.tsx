import { Background } from '.'
import { Text } from 'react-native'
import { render, screen } from '../../../__tests__/utils/customRender'

describe('Component: Background', () => {
  it('should be render background', () => {
    render(
      <Background>
        <Text>18/07</Text>
      </Background>,
    )

    expect(screen.getByText('18/07')).toBeTruthy()
  })
})
