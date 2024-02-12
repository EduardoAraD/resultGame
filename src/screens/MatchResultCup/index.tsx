import { useCallback, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'

import { useMatch } from '../../hook/useMatch'
import { getClubComplete } from '../../lib/asyncstorage/clubs'
import { CupRoutesNavigationProps } from '../../routes/routes/cup.routes'

import { ClubComplete, emptyClubComplete } from '../../Model/Club'
import { MatchStats, emptyMatchStats } from '../../Model/Match'
import { Background } from '../../components/Background'
import { Button } from '../../components/Button'
import { TitleWithTouchBack } from '../../components/TitleWithTouchBack'

import {
  CardMatch,
  Container,
  Content,
  Game,
  Goal,
  InfoClub,
  InfoMatch,
  LogoMatch,
  Name,
  Opacity,
  Placar,
  Stadium,
  VS,
  ViewClube,
} from './styles'

export function MatchResultCup() {
  const { navigate, goBack } = useNavigation<CupRoutesNavigationProps>()
  const { match } = useMatch()

  const [homeClub, setHomeClub] = useState<ClubComplete>(emptyClubComplete)
  const [awayClub, setAwayClub] = useState<ClubComplete>(emptyClubComplete)
  const [stats, setStats] = useState<MatchStats>(emptyMatchStats)
  const [loading, setLoading] = useState(false)

  const loadMatch = useCallback(async () => {
    try {
      if (!match) {
        return
      }
      setLoading(true)
      setStats(match)
      const [homeClubComplete, awayClubComplete] = await Promise.all([
        getClubComplete(match.home.id),
        getClubComplete(match.away.id),
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
  }, [goBack, match])

  async function goGameCurrent() {
    if (stats.status === 'start' && !!match) {
      navigate('match', {
        home: homeClub,
        away: awayClub,
        modeGame: match.type,
        idMatch: match.id,
      })
    } else {
      goBack()
    }
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
            <Name>{match ? match.cup.name : ''}</Name>
            <Name>{match ? match.cup.round : 0}° rodada</Name>
          </InfoClub>
          <CardMatch>
            {stats.status === 'finished' && <Name>Final</Name>}
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
                <Placar>
                  {stats.status === 'finished' && <Goal>{stats.goalHome}</Goal>}
                  <VS>vs</VS>
                  {stats.status === 'finished' && <Goal>{stats.goalAway}</Goal>}
                </Placar>
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
          title={
            stats.status === 'finished'
              ? 'Voltar para o campeonato'
              : 'Iniciar partida'
          }
          loading={loading}
        />
      </Container>
    </Background>
  )
}
