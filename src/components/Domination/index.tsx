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
import caretRight from '../../assets/icons/caret-right.svg'

interface DominationProps {
  domainClubHome: number
  domainClubAway: number
  minute: number
  velocityOfMatch: number
  updateVelocityOfMatch(): void
}

export function Domination({
  domainClubAway,
  domainClubHome,
  minute,
  velocityOfMatch,
  updateVelocityOfMatch,
}: DominationProps) {
  const {
    colors: { white },
  } = useTheme()
  const domainAll = domainClubHome + domainClubAway

  const porcentageDomainCLubHome = Math.round(
    (domainClubHome / domainAll) * 100,
  )

  const sharedProgress = useSharedValue(porcentageDomainCLubHome)
  const styledAnimated = useAnimatedStyle(() => {
    return {
      width: `${sharedProgress.value}%`,
    }
  })

  useEffect(() => {
    sharedProgress.value = withTiming(porcentageDomainCLubHome)
  }, [porcentageDomainCLubHome, sharedProgress])

  return (
    <>
      <Text style={{ color: white }}>{minute}&apos;</Text>
      <Touch testID="touch" activeOpacity={0.7} onPress={updateVelocityOfMatch}>
        <Text>{velocityOfMatch}x</Text>
        <ContentIcon>
          <Icon source={caretRight} />
          <Icon source={caretRight} disable={velocityOfMatch <= 1} />
          <Icon source={caretRight} disable={velocityOfMatch <= 2} />
        </ContentIcon>
      </Touch>
      <Container>
        <DomainHomeAnimated style={styledAnimated} />
        <DomainAway />
      </Container>
    </>
  )
}
