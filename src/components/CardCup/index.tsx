import { TouchableOpacityProps } from 'react-native'

import { CupShort } from '../../Model/Cup'

import { Card, Content, Image, Info, Line, Name, SubTitle } from './styles'
import trophyLeague from '../../assets/trophy_league.png'
import trophyCup from '../../assets/trophy_cup.png'
import { ThemeContext, useTheme } from 'styled-components/native'

interface CardCupProps extends TouchableOpacityProps {
  cup: CupShort
}

export function CardCup({ cup, ...rest }: CardCupProps) {
  const {
    colors: { red, green, white },
  } = useTheme()

  function colorLine(): string {
    switch (cup.status) {
      case 'closed':
        return red
      case 'progress':
        return white
      case 'start':
        return green
    }
  }

  function getNameCup(): string {
    switch (cup.type) {
      case 'cup':
        return 'Copa'
      case 'league':
        return 'Liga'
    }
  }

  const imageCup = cup.type === 'cup' ? trophyCup : trophyLeague

  return (
    <Card activeOpacity={0.7} {...rest}>
      <Line color={colorLine()} />
      <Content>
        <Image source={imageCup} alt="" />
        <Info>
          <Name>{cup.name}</Name>
          <SubTitle>{getNameCup()}</SubTitle>
          <SubTitle>{cup.numberClubs} clubes</SubTitle>
        </Info>
      </Content>
    </Card>
  )
}
