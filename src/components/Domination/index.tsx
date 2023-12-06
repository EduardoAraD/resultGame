import { useEffect } from "react";
import { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

import { Container, DomainAway, DomainHomeAnimated, Text } from "./styles";

interface DominationProps {
  domainHome: number;
  domainAway: number;
  minute: number
}

export function Domination({ domainAway, domainHome, minute }: DominationProps) {
  const domainTotal = domainHome + domainAway;
  // const widthHome = domainHome / (domainTotal) * 100
  // const widthAway = domainAway / (domainTotal) * 100

  // const half = minute > 45 ? 2 : 1
  const porcentageHome = Math.round((domainHome / domainTotal) * 100);

  const sharedProgress = useSharedValue(porcentageHome);

  const styledAnimated = useAnimatedStyle(() => {
    return {
      width: `${sharedProgress.value}%`,
    }
  })

  useEffect(() => {
    sharedProgress.value = withTiming(porcentageHome);
  }, [domainHome])

  return (
    <>
      <Text>{minute}'</Text>
      <Container>
        <DomainHomeAnimated style={styledAnimated} />
        <DomainAway />
      </Container>
    </>
  )
}