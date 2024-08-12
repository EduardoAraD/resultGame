import { useTheme } from 'styled-components/native'
import {
  ItemClassification,
  TypeItemClassification,
} from '../../Model/ItemClassification'

import { Content, Image, Info, Line, Name, Pos, Text } from './styles'

interface ItemClassProps {
  itemClassification: ItemClassification
  position: number
  actived?: boolean
}

export function ItemClassificationComponent({
  itemClassification,
  position,
  actived = false,
}: ItemClassProps) {
  const {
    colors: { green, red, gray_300 },
  } = useTheme()

  function getColorLine(): string {
    switch (itemClassification.type) {
      case 'promotion':
        return green
      case 'relegation':
        return red
      case 'standard':
        return gray_300
    }
  }

  return (
    <Content actived={actived}>
      <Line colorLine={getColorLine()} />
      <Pos>{position}</Pos>
      <Image source={itemClassification.club.logo} alt="" />
      <Name numberOfLines={1}>{itemClassification.club.name}</Name>
      <Info>
        <Text>{itemClassification.points}</Text>
        <Text>{itemClassification.games}</Text>
        <Text>{itemClassification.win}</Text>
        <Text>
          {itemClassification.goalsScored - itemClassification.goalsConceded}
        </Text>
        <Text>{itemClassification.goalsScored}</Text>
      </Info>
    </Content>
  )
}
