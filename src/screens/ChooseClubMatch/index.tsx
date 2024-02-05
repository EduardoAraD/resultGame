import { useMemo, useState } from 'react'
import { ScrollView } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

import { MatchRoutesNavigationProps } from '../../routes/routes/match.routes'
import { getClubComplete } from '../../lib/asyncstorage/clubs'

import { ClubShort, emptyClub } from '../../Model/Club'
import { ModeMatch } from '../../Model/ModeMatch'
import { Background } from '../../components/Background'
import { Button } from '../../components/Button'
import { HomeOrAway, ModalChooseClub } from '../../components/Modal'
import { TitleWithTouchBack } from '../../components/TitleWithTouchBack'

import {
  ButtonClube,
  CardMatch,
  Container,
  Content,
  DivClubes,
  Game,
  InfoClub,
  InfoMatch,
  LogoClube,
  LogoMatch,
  Name,
  Opacity,
  Title,
  VS,
  ViewClube,
} from './styles'

export interface ChooseClubMatchRouteProps {
  mode: ModeMatch
}

export function ChooseClubMatch() {
  const { navigate } = useNavigation<MatchRoutesNavigationProps>()
  const { mode } = useRoute().params as ChooseClubMatchRouteProps

  const [homeClub, setHomeClub] = useState<ClubShort>(emptyClub)
  const [awayClub, setAwayClub] = useState<ClubShort>(emptyClub)
  const [showModalChooseClub, setShowModalChooseClub] = useState(false)
  const [homeOrAway, setHomeOrAway] = useState<HomeOrAway | ''>('')
  const [loading, setLoading] = useState(false)

  async function goGameCurrent() {
    try {
      setLoading(true)
      const homeClubComplete = await getClubComplete(homeClub.id)
      const awayClubComplete = await getClubComplete(awayClub.id)

      if (homeClubComplete !== undefined && awayClubComplete !== undefined) {
        navigate('match', {
          home: homeClubComplete,
          away: awayClubComplete,
          modeGame: mode,
        })
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  function handleOpenModal(homeOrAway: HomeOrAway) {
    setHomeOrAway(homeOrAway)
    setShowModalChooseClub(true)
  }

  function handleCloseModal() {
    setShowModalChooseClub(false)
    setHomeOrAway('')
  }

  function handleUpdateClub(club: ClubShort, homeOrAway: HomeOrAway) {
    if (homeOrAway === 'home') {
      setHomeClub(club)
    } else {
      setAwayClub(club)
    }
  }

  const modeView = useMemo(() => {
    if (mode === 'Normal') return 'Amistoso'
    if (mode === 'Mata-Mata') return 'Eliminatória'
    else return mode
  }, [mode])

  const disabledButton =
    homeClub.name === '' || awayClub.name === '' || homeClub.id === awayClub.id

  return (
    <Background>
      <Container>
        <TitleWithTouchBack title="Escolher clubes" />

        <ScrollView>
          <Content>
            <DivClubes>
              <InfoClub>
                <Title>Casa</Title>
                <ButtonClube
                  activeOpacity={0.7}
                  onPress={() => handleOpenModal('home')}
                >
                  <LogoClube source={homeClub.logo} />
                </ButtonClube>
              </InfoClub>
              <InfoClub>
                <Title>Fora</Title>
                <ButtonClube
                  activeOpacity={0.7}
                  onPress={() => handleOpenModal('away')}
                >
                  <LogoClube source={awayClub.logo} />
                </ButtonClube>
              </InfoClub>
            </DivClubes>

            <CardMatch>
              <Name>{modeView}</Name>
              <Game>
                <Opacity>
                  <LogoMatch source={homeClub.logo} alt="" />
                  <LogoMatch source={awayClub.logo} alt="" />
                </Opacity>
                <InfoMatch>
                  <ViewClube position="flex-start">
                    <Name>{homeClub.name}</Name>
                  </ViewClube>
                  <VS>vs</VS>
                  <ViewClube position="flex-end">
                    <Name>{awayClub.name}</Name>
                  </ViewClube>
                </InfoMatch>
              </Game>
            </CardMatch>
          </Content>
        </ScrollView>

        <Button
          disabled={disabledButton}
          onPress={goGameCurrent}
          title="Iniciar"
          loading={loading}
        />
      </Container>
      {homeOrAway !== '' && showModalChooseClub && (
        <ModalChooseClub
          visible={showModalChooseClub}
          onClose={handleCloseModal}
          homeOrAway={homeOrAway}
          onSelectedClub={handleUpdateClub}
        />
      )}
    </Background>
  )
}
