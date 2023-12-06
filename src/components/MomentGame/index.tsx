import { ImageSourcePropType, View } from "react-native";
import Animated, { SlideInRight, SlideOutRight } from "react-native-reanimated";

import { Container, Logo, Minute, Text } from "./styles";

interface MomentGameProps {
  min: number;
  text: string;
  isPrimary?: boolean
  logo: ImageSourcePropType;
}

export function MomentGame({ min, text, isPrimary = false, logo }: MomentGameProps) {
  return (
    <Animated.View
      entering={SlideInRight}
      exiting={SlideOutRight}
    >
      <Container isPrimary={isPrimary}>
        <Minute>{min}</Minute>
        <Text>{text}</Text>
        {isPrimary && (
          <Logo source={logo} />
        )}
      </Container>
    </Animated.View>
  )
}