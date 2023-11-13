import { Container, Minute, Text } from "./styles";

interface MomentGameProps {
  min: number;
  text: string;
  isPrimary?: boolean
}

export function MomentGame({ min, text, isPrimary = false }: MomentGameProps) {
  return (
    <Container>
      <Minute>{min}</Minute>
      <Text>{text}</Text>
    </Container>
  )
}