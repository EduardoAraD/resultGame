import { useTheme } from 'styled-components/native'

import { Container, Icon, ImageBall } from './styles'

import logoBall from '../../assets/ball.png'
import checkFat from '../../assets/icons/check-fat.svg'
import x from '../../assets/icons/x.svg'

interface IconBallProps {
  checked: boolean
}

export function IconBall({ checked }: IconBallProps) {
  const { colors } = useTheme()

  return (
    <Container>
      <ImageBall source={logoBall} />
      {checked ? (
        <Icon
          testID="check"
          source={checkFat}
          style={{ tintColor: colors.green }}
        />
      ) : (
        <Icon testID="x" source={x} style={{ tintColor: colors.red }} />
      )}
    </Container>
  )
}
