import { Ball, CheckIcon, Container, XIcon } from "./styles";

interface IconBallProps {
  checked: boolean;
}

export function IconBall({ checked }: IconBallProps) {
  return (
    <Container>
      <Ball />
      {checked ? (
        <CheckIcon />
      ): (
        <XIcon />
      )}
    </Container>
  )
}