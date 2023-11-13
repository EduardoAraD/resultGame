import { TouchableOpacityProps } from "react-native";
import { Clube } from "../../Model/Clube";
import { Card, Image, Name, ViewImage } from "./styles";

interface CardClubProps extends TouchableOpacityProps {
  club: Clube;
}

export function CardClub({ club, ...rest }: CardClubProps) {
  return(
    <Card activeOpacity={0.7} {...rest}>
      <ViewImage>
        <Image source={club.logo} />
      </ViewImage>
      <Name>{club.name}</Name>
    </Card>
  )
}