import {
  ItemClassification,
  TypeItemClassification,
} from '../../Model/ItemClassification'

import { Content, Image, Info, Line, Name, Pos, Text } from './styles'

interface ItemClassProps {
  item: ItemClassification
  pos: number
  typeItem: TypeItemClassification
  actived?: boolean
}

export function ItemClass({
  item,
  pos,
  typeItem,
  actived = false,
}: ItemClassProps) {
  return (
    <Content actived={actived}>
      <Line type={typeItem} />
      <Pos>{pos}</Pos>
      <Image source={item.club.logo} alt="" />
      <Name numberOfLines={1}>{item.club.name}</Name>
      <Info>
        <Text>{item.points}</Text>
        <Text>{item.games}</Text>
        <Text>{item.win}</Text>
        <Text>{item.goalsScored - item.goalsConceded}</Text>
        <Text>{item.goalsScored}</Text>
      </Info>
    </Content>
  )
}
