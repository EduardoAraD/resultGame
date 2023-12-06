import { CheckFat, SoccerBall, X } from "phosphor-react-native";
import { useTheme } from "styled-components/native";

import logoBall from '../../assets/ball.png';
import { Container, ImageBall } from "./styles";

interface IconBallProps {
  checked: boolean;
}

export function IconBall({ checked }: IconBallProps) {
  const { colors } = useTheme();

  return (
    <Container>
      <ImageBall source={logoBall} />
      {checked ? (
        <CheckFat
          color={colors.green}
          weight="fill"
          size={22}
          style={{ position: 'absolute', bottom: -5, right: -5 }}
        />
      ): (
        <X
          color={colors.red}
          weight="bold"
          size={22}
          style={{ position: 'absolute', bottom: -5, right: -5 }}
        />
      )}
    </Container>
  )
}
