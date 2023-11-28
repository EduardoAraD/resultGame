import { ImageSourcePropType, View } from "react-native";
import { Container, Logo, Minute, Text } from "./styles";

interface MomentGameProps {
  min: number;
  text: string;
  isPrimary?: boolean
  logo: ImageSourcePropType;
}

export function MomentGame({ min, text, isPrimary = false, logo }: MomentGameProps) {
  return (
    <Container isPrimary={isPrimary}>
      <Minute>{min}</Minute>
      <Text>{text}</Text>
      {isPrimary && (
        <Logo source={logo} />
      )}
    </Container>
  )
}