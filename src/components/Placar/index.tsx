import { Container, Line, Text } from "./styles";

interface PlacarProps {
  goalHome: number;
  goalAway: number;
}

export function Placar({ goalAway, goalHome }: PlacarProps) {
  return (
    <Container>
      <Text style={{ textAlign: 'right' }}>{goalHome}</Text>
      <Line />
      <Text style={{ textAlign: 'left' }}>{goalAway}</Text>
    </Container>
  )
}