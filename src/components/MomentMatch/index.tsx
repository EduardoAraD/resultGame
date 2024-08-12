import { ImageSourcePropType } from 'react-native'
import Animated, { SlideInRight, SlideOutRight } from 'react-native-reanimated'

import { Container, Logo, Minute, Text } from './styles'

interface MomentGameProps {
  minute: number
  narration: string
  isGoal?: boolean
  logo: ImageSourcePropType
}

export function MomentMatch({
  minute,
  narration,
  isGoal = false,
  logo,
}: MomentGameProps) {
  return (
    <Animated.View entering={SlideInRight} exiting={SlideOutRight}>
      <Container isGoal={isGoal}>
        <Minute>{minute}</Minute>
        <Text>{narration}</Text>
        {isGoal && <Logo testID="logo" source={logo} />}
      </Container>
    </Animated.View>
  )
}
