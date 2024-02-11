import { FlatList } from 'react-native'

import {
  ItemClassification,
  TypeItemClassification,
} from '../../../../Model/ItemClassification'
import { ItemClass } from '../../../../components/ItemClassification'

import {
  Border,
  Container,
  Content,
  Point,
  Text,
  TextPoint,
  ViewPoint,
} from './styles'

interface ClassificationProps {
  listItemClass: ItemClassification[]
  numberClubsPromotion: number
  numberClubsRelegation: number
}

export function Classification({
  listItemClass,
  numberClubsPromotion,
  numberClubsRelegation,
}: ClassificationProps) {
  function onTypeItemClass(pos: number): TypeItemClassification {
    const posClubsRelegation = listItemClass.length - numberClubsRelegation
    if (pos < numberClubsPromotion) {
      return 'Promotion'
    } else if (pos >= posClubsRelegation) {
      return 'Relegation'
    } else {
      return 'Normal'
    }
  }

  return (
    <Container>
      <Border>
        <Content>
          <Text>POS</Text>
          <Text style={{ flex: 1 }}>Name</Text>
          <Text>P</Text>
          <Text>J</Text>
          <Text>V</Text>
          <Text>SG</Text>
          <Text>GF</Text>
        </Content>

        <FlatList
          data={listItemClass}
          keyExtractor={(item) => item.club.id}
          renderItem={({ item, index }) => (
            <ItemClass
              item={item}
              pos={index + 1}
              typeItem={onTypeItemClass(index)}
            />
          )}
        />
        <Content style={{ justifyContent: 'center' }}>
          <ViewPoint>
            <Point type="Promotion" />
            <TextPoint>Promoção</TextPoint>
          </ViewPoint>
          <ViewPoint>
            <Point type="Normal" />
            <TextPoint>Sem acesso</TextPoint>
          </ViewPoint>
          <ViewPoint>
            <Point type="Relegation" />
            <TextPoint>Rebaixado</TextPoint>
          </ViewPoint>
        </Content>
      </Border>
    </Container>
  )
}
