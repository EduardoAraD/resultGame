import { useMemo } from 'react'
import { ScrollView } from 'react-native'

import { useCup } from '../../hook/useCup'

import { TypeItemClassification } from '../../Model/ItemClassification'
import { ItemClass } from '../ItemClassification'

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
  idsClubInMatchLive?: string[]
  hasMatchStatsProgressInClassification?: boolean
}

export function Classification({
  idsClubInMatchLive = [],
  hasMatchStatsProgressInClassification = false,
}: ClassificationProps) {
  const {
    getClassificationInLeague,
    cup: { numberClubsPromoted, numberClubsRelegated },
  } = useCup()

  function onTypeItemClass(pos: number): TypeItemClassification {
    const posClubsRelegation = classification.length - numberClubsRelegated
    if (pos < numberClubsPromoted) {
      return 'Promotion'
    } else if (pos >= posClubsRelegation) {
      return 'Relegation'
    } else {
      return 'Normal'
    }
  }

  const classification = useMemo(() => {
    return getClassificationInLeague(hasMatchStatsProgressInClassification)
  }, [getClassificationInLeague, hasMatchStatsProgressInClassification])

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
          {classification.map((itemClass, index) => (
            <ItemClass
              key={itemClass.club.id}
              item={itemClass}
              actived={
                !!idsClubInMatchLive.find((id) => itemClass.club.id === id)
              }
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
