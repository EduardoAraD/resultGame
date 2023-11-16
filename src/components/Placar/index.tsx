import { Container, ContainerPenalts, Line, SubText, Text } from "./styles";

interface PlacarProps {
  goalHome: number;
  goalAway: number;
  hasPenalts: boolean;
  penaltHome: number;
  penaltAway: number;
}

export function Placar({
  goalAway,
  goalHome,
  penaltAway,
  penaltHome,
  hasPenalts
}: PlacarProps) {
  return (
    <Container hasPenalts={hasPenalts}>
      <Text style={{ textAlign: 'right' }}>{goalHome}</Text>
      {hasPenalts && (
        <SubText style={{ textAlign: 'right' }}>{penaltHome}</SubText>
      )}
      { hasPenalts ? (
        <ContainerPenalts>
          <SubText>P</SubText>
          <Line />
        </ContainerPenalts>
      ) : (
        <Line />
      )}
      {hasPenalts && (
        <SubText style={{ textAlign: 'left' }}>{penaltAway}</SubText>
      )}
      <Text style={{ textAlign: 'left' }}>{goalAway}</Text>
    </Container>
  )
}
