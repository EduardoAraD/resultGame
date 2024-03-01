import { useState } from 'react'
import { Alert, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { removeCup } from '../../../../lib/asyncstorage/cup'
import { useCup } from '../../../../hook/useCup'

import { Button } from '../../../../components/Button'

import {
  Actions,
  Container,
  Content,
  ContentLine,
  Line,
  SubTitle,
  Text,
  ValueText,
  ValueView,
} from './styles'

export function InfoCup() {
  const {
    cup: {
      id,
      type,
      roundTrip,
      hasThirdPlace,
      winPoints,
      lossPoints,
      drawPoints,
      numberClubsPromoted,
      numberClubsRelegated,
    },
  } = useCup()
  const { goBack } = useNavigation()
  const [loading, setLoading] = useState(false)

  async function handleRemoveCup() {
    try {
      setLoading(true)
      Alert.alert(
        'Deletar campeonato',
        'Você deseja remover esse campeonato?',
        [
          {
            text: 'Não',
            style: 'cancel',
          },
          {
            text: 'Sim',
            onPress: async () => {
              await removeCup(id)
              goBack()
            },
          },
        ],
      )
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container>
      <ScrollView>
        <Content>
          <SubTitle>Jogos</SubTitle>
          <ContentLine>
            <Text>Partidas</Text>
            <ValueText>{roundTrip ? 'Ida e volta' : 'Somente ida'}</ValueText>
          </ContentLine>
          {type === 'Cup' && (
            <ContentLine>
              <Text>Disputa de terceiro lugar</Text>
              <ValueText>{hasThirdPlace ? 'Válido' : 'Inválido'}</ValueText>
            </ContentLine>
          )}

          {type === 'League' && (
            <>
              <Line />
              <SubTitle>Pontuação</SubTitle>
              <ContentLine>
                <Text>Pontos por vitória</Text>
                <ValueView>
                  <ValueText>{winPoints}</ValueText>
                </ValueView>
              </ContentLine>
              <ContentLine>
                <Text>Pontos por empate</Text>
                <ValueView>
                  <ValueText>{drawPoints}</ValueText>
                </ValueView>
              </ContentLine>
              <ContentLine>
                <Text>Pontos por derrota</Text>
                <ValueView>
                  <ValueText>{lossPoints}</ValueText>
                </ValueView>
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
                  <ValueText>{numberClubsPromoted}</ValueText>
                </ValueView>
              </ContentLine>
              <ContentLine>
                <Text>Clubes rebaixados</Text>
                <ValueView>
                  <ValueText>{numberClubsRelegated}</ValueText>
                </ValueView>
              </ContentLine>
            </>
          )}
        </Content>
      </ScrollView>
      <Actions>
        <Button
          type="Cancel"
          loading={loading}
          style={{ flex: 1 }}
          title="Deletar campeonato"
          onPress={handleRemoveCup}
        />
      </Actions>
    </Container>
  )
}
