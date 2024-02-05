import { CheckFat, X } from 'phosphor-react-native'
import { useTheme } from 'styled-components/native'

import { Container, ImageBall } from './styles'
import logoBall from '../../assets/ball.png'

interface IconBallProps {
  checked: boolean
}

export function IconBall({ checked }: IconBallProps) {
  const { colors } = useTheme()

  return (
    <Container>
      <ImageBall source={logoBall} />
      {checked ? (
        <CheckFat
          color={colors.green}
          weight="fill"
          size={16}
          style={{ position: 'absolute', bottom: -5, right: -5 }}
        />
      ) : (
        <X
          color={colors.red}
          weight="bold"
          size={16}
          style={{ position: 'absolute', bottom: -5, right: -5 }}
        />
      )}
    </Container>
  )
}
