import { TypeCup } from '../../../../Model/Cup'
import { ButtonRadio } from '../../../../components/ButtonRadio'

import { ActionsTouch } from './actionsTouch'

import {
  Container,
  Content,
  ContentLine,
  Line,
  SubTitle,
  Text,
  Title,
} from './styles'

interface InfoCupProps {
  typeCup: TypeCup | ''
  hasTripMatch: boolean
  hasThirdPlace: boolean
  pointsWin: number
  pointsDraw: number
  pointsLoss: number
  clubPromotion: number
  clubRelegation: number
  onHasTripMatch: (value: boolean) => void
  onHasThirdPlace: (value: boolean) => void
  onPointsWin: (points: number) => void
  onPointsDraw: (points: number) => void
  onPointsLoss: (points: number) => void
  onClubPromotion: (points: number) => void
  onClubRelegation: (points: number) => void
}

export function InfoCup({
  typeCup,
  hasTripMatch,
  onHasTripMatch,
  // hasAwayGoal,
  // onHasAwayGoal,
  clubPromotion,
  clubRelegation,
  pointsWin,
  pointsDraw,
  pointsLoss,
  onClubPromotion,
  onClubRelegation,
  onPointsDraw,
  onPointsLoss,
  onPointsWin,
  hasThirdPlace,
  onHasThirdPlace,
}: InfoCupProps) {
  return (
    <Container>
      <Title>Informações do Campeonato</Title>
      <Content>
        <SubTitle>Jogos</SubTitle>
        <ContentLine>
          <Text>Ida e Volta</Text>
          <ButtonRadio
            selected={hasTripMatch}
            onPress={() => onHasTripMatch(!hasTripMatch)}
          />
        </ContentLine>
        {typeCup === 'Cup' && (
          <ContentLine>
            <Text>Disputa de Terceiro Lugar</Text>
            <ButtonRadio
              selected={hasThirdPlace}
              onPress={() => onHasThirdPlace(!hasThirdPlace)}
            />
          </ContentLine>
        )}

        {typeCup === 'League' && (
          <>
            <Line />
            <SubTitle>Pontuação</SubTitle>
            <ContentLine>
              <Text>Pontos por vitória</Text>
              <ActionsTouch points={pointsWin} onPoints={onPointsWin} />
            </ContentLine>
            <ContentLine>
              <Text>Pontos por empate</Text>
              <ActionsTouch points={pointsDraw} onPoints={onPointsDraw} />
            </ContentLine>
            <ContentLine>
              <Text>Pontos por derrota</Text>
              <ActionsTouch points={pointsLoss} onPoints={onPointsLoss} />
            </ContentLine>
          </>
        )}

        {/* {typeCup === 'Cup' && (
          <>
            <Line />
            <SubTitle>Critérios</SubTitle>
            <ContentLine>
              <Text>Gol fora</Text>
              <ButtonRadio
                selected={hasAwayGoal}
                onPress={() => onHasAwayGoal(!hasAwayGoal)}
              />
            </ContentLine>
          </>
        )} */}

        {typeCup === 'League' && (
          <>
            <Line />
            <SubTitle>Promoção e Rebaixamento</SubTitle>
            <ContentLine>
              <Text>Clubes promividos</Text>
              <ActionsTouch points={clubPromotion} onPoints={onClubPromotion} />
            </ContentLine>
            <ContentLine>
              <Text>Clubes rebaixados</Text>
              <ActionsTouch
                points={clubRelegation}
                onPoints={onClubRelegation}
              />
            </ContentLine>
          </>
        )}
      </Content>
    </Container>
  )
}
