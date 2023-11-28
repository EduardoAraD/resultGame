import { TouchableOpacityProps } from "react-native";

import { ButtonTypeColor, Touch, TouchText } from "./styles";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  type?: ButtonTypeColor
}

export function Button({ title, type = 'Primary', ...rest }: ButtonProps) {
  return (
    <Touch activeOpacity={0.7} type={type} {...rest}>
      <TouchText type={type}>{title}</TouchText>
    </Touch>
  )
}
