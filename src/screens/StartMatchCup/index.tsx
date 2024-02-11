import { useCallback, useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'

import { getClubComplete } from '../../lib/asyncstorage/clubs'
import { CupRoutesNavigationProps } from '../../routes/routes/cup.routes'

import { ClubComplete, emptyClubComplete } from '../../Model/Club'
import { ModeMatch } from '../../Model/ModeMatch'
import { Background } from '../../components/Background'
import { Button } from '../../components/Button'
import { TitleWithTouchBack } from '../../components/TitleWithTouchBack'

import {
  CardMatch,
  Container,
  Content,
  Game,
  InfoClub,
  InfoMatch,
  LogoMatch,
  Name,
  Opacity,
  Stadium,
  VS,
  ViewClube,
} from './styles'

export interface StartMatchCupRouteProps {
  match: {
    homeId: string
    awayId: string
    idMatch: string
    mode: ModeMatch
  }
  cup: {
    id: string
    name: string
    numberRound: number
  }
}

export function StartMatchCup() {
  const { navigate, goBack } = useNavigation<CupRoutesNavigationProps>()
  const { match, cup } = useRoute().params as StartMatchCupRouteProps

  const [homeClub, setHomeClub] = useState<ClubComplete>(emptyClubComplete)
  const [awayClub, setAwayClub] = useState<ClubComplete>(emptyClubComplete)
  const [loading, setLoading] = useState(false)

  const loadMatch = useCallback(async () => {
    try {
      setLoading(true)
      const [homeClubComplete, awayClubComplete] = await Promise.all([
        getClubComplete(match.homeId),
        getClubComplete(match.awayId),
      ])

      if (homeClubComplete !== undefined && awayClubComplete !== undefined) {
        setHomeClub(homeClubComplete)
        setAwayClub(awayClubComplete)
      } else {
        goBack()
      }
    } catch (error) {
      console.log(false)
      goBack()
    } finally {
      setLoading(false)
    }
  }, [goBack, match.awayId, match.homeId])

  async function goGameCurrent() {
    navigate('match', {
      home: homeClub,
      away: awayClub,
      modeGame: match.mode,
      idMatch: match.idMatch,
      idCup: cup.id,
    })
  }

  useEffect(() => {
    loadMatch()
  }, [loadMatch])

  return (
    <Background>
      <Container>
        <TitleWithTouchBack title="Confronto" />

        <Content>
          <InfoClub>
            <Name>{cup.name}</Name>
            <Name>{cup.numberRound}° rodada</Name>
          </InfoClub>
          <CardMatch>
            <Stadium>{homeClub.stadium}</Stadium>
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

        <Button
          disabled={loading}
          onPress={goGameCurrent}
          title="Iniciar partida"
          loading={loading}
        />
      </Container>
    </Background>
  )
}
