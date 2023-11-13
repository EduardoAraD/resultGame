import { TouchableOpacityProps } from "react-native";
import { Touch, TouchText } from "./styles";

interface ButtonProps extends TouchableOpacityProps {}

export function Button({ ...rest }: ButtonProps) {
  return (
    <Touch activeOpacity={0.7} {...rest}>
      <TouchText>Continuar</TouchText>
    </Touch>
  )
}