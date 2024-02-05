import { useEffect } from 'react'
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { useTheme } from 'styled-components/native'

import {
  Container,
  ContentIcon,
  DomainAway,
  DomainHomeAnimated,
  Icon,
  Text,
  Touch,
} from './styles'

interface DominationProps {
  domainHome: number
  domainAway: number
  minute: number
  velocityGame: number
  updateVelocityGame(): void
}

export function Domination({
  domainAway,
  domainHome,
  minute,
  velocityGame,
  updateVelocityGame,
}: DominationProps) {
  const {
    colors: { white },
  } = useTheme()
  const domainTotal = domainHome + domainAway
  // const widthHome = domainHome / (domainTotal) * 100
  // const widthAway = domainAway / (domainTotal) * 100

  // const half = minute > 45 ? 2 : 1
  const porcentageHome = Math.round((domainHome / domainTotal) * 100)

  const sharedProgress = useSharedValue(porcentageHome)

  const styledAnimated = useAnimatedStyle(() => {
    return {
      width: `${sharedProgress.value}%`,
    }
  })

  useEffect(() => {
    sharedProgress.value = withTiming(porcentageHome)
  }, [domainHome, porcentageHome, sharedProgress])

  return (
    <>
      <Text style={{ color: white }}>{minute}&apos;</Text>
      <Touch activeOpacity={0.7} onPress={updateVelocityGame}>
        <Text>{velocityGame}x</Text>
        <ContentIcon>
          <Icon />
          <Icon disable={velocityGame <= 1} />
          <Icon disable={velocityGame <= 2} />
        </ContentIcon>
      </Touch>
      <Container>
        <DomainHomeAnimated style={styledAnimated} />
        <DomainAway />
      </Container>
    </>
  )
}
