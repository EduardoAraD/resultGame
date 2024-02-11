import { useMemo, useState } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { randomUUID } from 'expo-crypto'
import { useNavigation } from '@react-navigation/native'

import { CupRoutesNavigationProps } from '../../routes/routes/cup.routes'

import { CupComplete, TypeCup } from '../../Model/Cup'
import { Background } from '../../components/Background'
import { Button } from '../../components/Button'
import { InfoCup } from './components/InfoCup'
import { Input } from '../../components/Input'
import { TitleWithTouchBack } from '../../components/TitleWithTouchBack'

import {
  Actions,
  Container,
  Image,
  SubTitle,
  TouchText,
  TouchTypeCup,
  ViewImage,
} from './styles'
import trophyLeague from '../../assets/trophy_league.png'
// import trophyCup from '../../assets/trophy_cup.png'

export function CupCreate() {
  const { navigate } = useNavigation<CupRoutesNavigationProps>()

  const [name, setName] = useState('')
  const [typeCup, setTypeCup] = useState<TypeCup | ''>('League')
  const [hasTripMatch, setHasTripMatch] = useState(false)
  const [hasAwayGoal, setHasAwayGoal] = useState(false)
  const [pointsWin, setPointsWin] = useState(3)
  const [pointsDraw, setPointsDraw] = useState(1)
  const [pointsLoss, setPointsLoss] = useState(0)
  const [clubsPromotion, setClubsPromotion] = useState(2)
  const [clubsRelegation, setClubsRelegation] = useState(2)

  function handleCreateCup() {
    if (typeCup === '') {
      return
    }

    const id = randomUUID()
    const createCup: CupComplete = {
      name,
      type: typeCup,
      roundTrip: hasTripMatch,
      hasAwayGoal,
      winPoints: pointsWin,
      lossPoints: pointsLoss,
      drawPoints: pointsDraw,
      numberClubsPromoted: clubsPromotion,
      numberClubsRelegated: clubsRelegation,
      numberClubs: clubsPromotion + clubsRelegation,
      status: 'start',
      id,
      idsClubs: [],
    }

    navigate('chooseClubs', { cup: createCup })
  }

  const disabledButtonContinue = useMemo(() => {
    return name.trim() === '' || typeCup === ''
  }, [name, typeCup])

  return (
    <Background>
      <Container>
        <TitleWithTouchBack title="Criar novo campeonato" />
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingTop: 40,
              paddingBottom: 50,
              gap: 20,
            }}
          >
            <Input
              onChangeText={setName}
              value={name}
              placeholder="Nome do campeonato"
              editable={true}
            />
            <SubTitle>Tipo do campeonato</SubTitle>
            <Actions style={{ justifyContent: 'center' }}>
              <TouchTypeCup
                activeOpacity={0.7}
                onPress={() => setTypeCup('League')}
              >
                <ViewImage actived={typeCup === 'League'}>
                  <Image source={trophyLeague} alt="League" />
                </ViewImage>
                <TouchText>Liga</TouchText>
              </TouchTypeCup>
              {/* <TouchTypeCup
                activeOpacity={0.7}
                onPress={() => setTypeCup('Cup')}
              >
                <ViewImage actived={typeCup === 'Cup'}>
                  <Image source={trophyCup} alt="Copa" />
                </ViewImage>
                <TouchText>Copa</TouchText>
              </TouchTypeCup> */}
            </Actions>

            <InfoCup
              typeCup={typeCup}
              clubPromotion={clubsPromotion}
              clubRelegation={clubsRelegation}
              hasAwayGoal={hasAwayGoal}
              hasTripMatch={hasTripMatch}
              pointsDraw={pointsDraw}
              pointsLoss={pointsLoss}
              pointsWin={pointsWin}
              onClubPromotion={setClubsPromotion}
              onClubRelegation={setClubsRelegation}
              onHasAwayGoal={setHasAwayGoal}
              onHasTripMatch={setHasTripMatch}
              onPointsDraw={setPointsDraw}
              onPointsLoss={setPointsLoss}
              onPointsWin={setPointsWin}
            />

            <Button
              disabled={disabledButtonContinue}
              title="Continuar"
              style={{ marginTop: 20 }}
              onPress={handleCreateCup}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </Container>
    </Background>
  )
}
