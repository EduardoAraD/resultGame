import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { ScrollView } from 'react-native'

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
  Penal,
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
  const [statsTrip, setStatsTrip] = useState<MatchStats | undefined>(undefined)
  const [loading, setLoading] = useState(false)

  const loadMatch = useCallback(async () => {
    try {
      if (!match) {
        return
      }
      setLoading(true)
      setStats(match.stats)
      setStatsTrip(match.statsTrip)
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
      console.log(error)
      goBack()
    } finally {
      setLoading(false)
    }
  }, [goBack, match])

  async function goGameCurrent() {
    if (match) {
      if (statsTrip !== undefined && statsTrip.status === 'start') {
        navigate('match', {
          home: awayClub,
          away: homeClub,
          modeGame: statsTrip.type,
          idMatch: statsTrip.id,
        })
      } else if (stats.status !== 'finished') {
        navigate('match', {
          home: homeClub,
          away: awayClub,
          modeGame: match.stats.type,
          idMatch: match.stats.id,
          placarMatchTrip:
            statsTrip !== undefined
              ? {
                  goalHome: statsTrip.goalAway,
                  goalAway: statsTrip.goalHome,
                }
              : undefined,
        })
      } else {
        goBack()
      }
    } else {
      goBack()
    }
  }

  useEffect(() => {
    loadMatch()
  }, [loadMatch])

  const titleButton = useMemo(() => {
    if (statsTrip !== undefined) {
      if (statsTrip.status === 'start') {
        return 'Iniciar partida de ida'
      }

      return stats.status === 'finished'
        ? 'Voltar para o campeonato'
        : 'Iniciar partida de volta'
    } else {
      return stats.status === 'finished'
        ? 'Voltar para o campeonato'
        : 'Iniciar partida'
    }
  }, [stats.status, statsTrip])

  const hasPenal = stats.goalAwayPenal > 0 || stats.goalHomePenal > 0

  return (
    <Background>
      <Container>
        <TitleWithTouchBack title={match ? match.cup.name : 'Confronto'} />

        <ScrollView>
          <Content>
            <InfoClub>
              <Name>{match ? match.round.name : ''}</Name>
            </InfoClub>
            {statsTrip !== undefined && (
              <CardMatch>
                <Stadium>{awayClub.stadium}</Stadium>
                <Game>
                  <Opacity>
                    <LogoMatch source={awayClub.logo} alt="" />
                    <LogoMatch source={homeClub.logo} alt="" />
                  </Opacity>
                  <InfoMatch
                    style={{ gap: statsTrip.status === 'start' ? 10 : 0 }}
                  >
                    <ViewClube position="flex-start">
                      <Name>{awayClub.name}</Name>
                    </ViewClube>
                    <Placar>
                      {statsTrip.status === 'finished' && (
                        <Goal>{statsTrip.goalHome}</Goal>
                      )}
                      <VS>vs</VS>
                      {statsTrip.status === 'finished' && (
                        <Goal>{statsTrip.goalAway}</Goal>
                      )}
                    </Placar>
                    <ViewClube position="flex-end">
                      <Name>{homeClub.name}</Name>
                    </ViewClube>
                  </InfoMatch>
                </Game>
              </CardMatch>
            )}

            <CardMatch>
              <Stadium>{homeClub.stadium}</Stadium>
              <Game>
                <Opacity>
                  <LogoMatch source={homeClub.logo} alt="" />
                  <LogoMatch source={awayClub.logo} alt="" />
                </Opacity>
                <InfoMatch style={{ gap: stats.status === 'start' ? 10 : 0 }}>
                  <ViewClube position="flex-start">
                    <Name>{homeClub.name}</Name>
                  </ViewClube>
                  <Placar>
                    {stats.status === 'finished' && (
                      <Goal>{stats.goalHome}</Goal>
                    )}
                    {hasPenal && <Penal>{stats.goalHomePenal}</Penal>}
                    <VS>vs</VS>
                    {hasPenal && <Penal>{stats.goalAwayPenal}</Penal>}
                    {stats.status === 'finished' && (
                      <Goal>{stats.goalAway}</Goal>
                    )}
                  </Placar>
                  <ViewClube position="flex-end">
                    <Name>{awayClub.name}</Name>
                  </ViewClube>
                </InfoMatch>
              </Game>
            </CardMatch>
          </Content>
        </ScrollView>
        <Button
          disabled={loading}
          onPress={goGameCurrent}
          title={titleButton}
          loading={loading}
        />
      </Container>
    </Background>
  )
}
