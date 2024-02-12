import { ScrollView } from 'react-native'

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
      <ScrollView contentContainerStyle={{ paddingTop: 10, paddingBottom: 30 }}>
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
          {listItemClass.map((itemClass, index) => (
            <ItemClass
              key={itemClass.club.id}
              item={itemClass}
              pos={index + 1}
              typeItem={onTypeItemClass(index)}
            />
          ))}
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
      </ScrollView>
    </Container>
  )
}
