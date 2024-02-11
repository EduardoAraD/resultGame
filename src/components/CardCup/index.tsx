import { TouchableOpacityProps } from 'react-native'

import { CupShort } from '../../Model/Cup'

import { Card, Content, Image, Info, Line, Name, SubTitle } from './styles'
import trophyLeague from '../../assets/trophy_league.png'
import trophyCup from '../../assets/trophy_cup.png'

interface CardCupProps extends TouchableOpacityProps {
  cup: CupShort
}

export function CardCup({ cup, ...rest }: CardCupProps) {
  return (
    <Card activeOpacity={0.7} {...rest}>
      <Line status={cup.status} />
      <Content>
        <Image source={cup.type === 'Cup' ? trophyCup : trophyLeague} alt="" />
        <Info>
          <Name>{cup.name}</Name>
          <SubTitle>{cup.type}</SubTitle>
          <SubTitle>{cup.numberClubs} clubes</SubTitle>
        </Info>
      </Content>
    </Card>
  )
}
