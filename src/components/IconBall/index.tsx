import { CheckFat, SoccerBall, X } from "phosphor-react-native";
import { useTheme } from "styled-components/native";

import { Container } from "./styles";

interface IconBallProps {
  checked: boolean;
}

export function IconBall({ checked }: IconBallProps) {
  const { colors } = useTheme();

  return (
    <Container>
      <SoccerBall weight="thin" size={28} color={colors.white} />
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
