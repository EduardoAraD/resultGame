import { useMemo } from 'react'
import { ScrollView } from 'react-native'
import { useTheme } from 'styled-components/native'

import { useCup } from '../../hook/useCup'

import { ItemClassificationComponent } from '../ItemClassification'

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
  const { colors } = useTheme()

  const { getClassificationInLeague } = useCup()

  const classification = useMemo(() => {
    return getClassificationInLeague(hasMatchStatsProgressInClassification)
  }, [getClassificationInLeague, hasMatchStatsProgressInClassification])

  return (
    <Container>
      <ScrollView contentContainerStyle={{ paddingTop: 10, paddingBottom: 30 }}>
        <Border>
          <Content>
            <Text>POS</Text>
            <Text style={{ flex: 1 }}>Nome</Text>
            <Text>P</Text>
            <Text>J</Text>
            <Text>V</Text>
            <Text>SG</Text>
            <Text>GF</Text>
          </Content>
          {classification.map((itemClass, index) => (
            <ItemClassificationComponent
              key={itemClass.club.id}
              itemClassification={itemClass}
              actived={
                !!idsClubInMatchLive.find((id) => itemClass.club.id === id)
              }
              position={index + 1}
            />
          ))}
          <Content style={{ justifyContent: 'center' }}>
            <ViewPoint>
              <Point colorTypeClass={colors.green} />
              <TextPoint>Promoção</TextPoint>
            </ViewPoint>
            <ViewPoint>
              <Point colorTypeClass={colors.gray_300} />
              <TextPoint>Sem acesso</TextPoint>
            </ViewPoint>
            <ViewPoint>
              <Point colorTypeClass={colors.red} />
              <TextPoint>Rebaixado</TextPoint>
            </ViewPoint>
          </Content>
        </Border>
      </ScrollView>
    </Container>
  )
}
