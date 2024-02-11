import { ScrollView } from 'react-native'

import { TypeCup } from '../../../../Model/Cup'

import {
  Content,
  ContentLine,
  Line,
  SubTitle,
  Text,
  ValueText,
  ValueView,
} from './styles'

interface InfoCupProps {
  type: TypeCup
  hasTripRound: boolean
  hasAwayGoal: boolean
  pointsToWin: number
  pointsToDraw: number
  pointsToLoss: number
  numberPromotionClubs: number
  numberRelegationClubs: number
}

export function InfoCup({
  type,
  hasTripRound,
  pointsToDraw,
  pointsToLoss,
  pointsToWin,
  hasAwayGoal,
  numberPromotionClubs,
  numberRelegationClubs,
}: InfoCupProps) {
  return (
    <ScrollView>
      <Content>
        <SubTitle>Jogos</SubTitle>
        <ContentLine>
          <Text>Partidas</Text>
          <ValueText>{hasTripRound ? 'Ida e volta' : 'Somente ida'}</ValueText>
        </ContentLine>

        {type === 'League' && (
          <>
            <Line />
            <SubTitle>Pontuação</SubTitle>
            <ContentLine>
              <Text>Pontos por vitória</Text>
              <ValueView>
                <ValueText>{pointsToWin}</ValueText>
              </ValueView>
            </ContentLine>
            <ContentLine>
              <Text>Pontos por empate</Text>
              <ValueView>
                <ValueText>{pointsToDraw}</ValueText>
              </ValueView>
            </ContentLine>
            <ContentLine>
              <Text>Pontos por derrota</Text>
              <ValueView>
                <ValueText>{pointsToLoss}</ValueText>
              </ValueView>
            </ContentLine>
          </>
        )}

        {type === 'Cup' && (
          <>
            <Line />
            <SubTitle>Critérios</SubTitle>
            <ContentLine>
              <Text>Gol fora</Text>
              <ValueText>{hasAwayGoal ? 'Válido' : 'Inválido'}</ValueText>
            </ContentLine>
          </>
        )}

        {type === 'League' && (
          <>
            <Line />
            <SubTitle>Promoções e Rebaixamentos</SubTitle>
            <ContentLine>
              <Text>Clubes promovidos</Text>
              <ValueView>
                <ValueText>{numberPromotionClubs}</ValueText>
              </ValueView>
            </ContentLine>
            <ContentLine>
              <Text>Clubes rebaixados</Text>
              <ValueView>
                <ValueText>{numberRelegationClubs}</ValueText>
              </ValueView>
            </ContentLine>
          </>
        )}
      </Content>
    </ScrollView>
  )
}
