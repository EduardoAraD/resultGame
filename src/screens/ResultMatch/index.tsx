import { useCallback, useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'

import { CupRoutesNavigationProps } from '../../routes/routes/cup.routes'
import { useClubs } from '../../hook/useClubs'
import { saveMatchStats } from '../../lib/asyncstorage/matchs'

import { ClubShort, emptyClub } from '../../Model/Club'
import { MatchStats } from '../../Model/Match'
import { Background } from '../../components/Background'
import { Button } from '../../components/Button'
import { TitleWithTouchBack } from '../../components/TitleWithTouchBack'

import {
  CardMatch,
  Container,
  Content,
  Game,
  Goal,
  InfoMatch,
  LogoMatch,
  Name,
  Opacity,
  Placar,
  VS,
  ViewClube,
} from './styles'

export interface ResultMatchRouteParams {
  stats: MatchStats
  homeId: string
  awayId: string
  idCup: string
}

export function ResultMatch() {
  const { clubs } = useClubs()
  const { navigate } = useNavigation<CupRoutesNavigationProps>()
  const { stats, homeId, awayId, idCup } = useRoute()
    .params as ResultMatchRouteParams

  const [homeClub, setHomeClub] = useState<ClubShort>(emptyClub)
  const [awayClub, setAwayClub] = useState<ClubShort>(emptyClub)
  const [loading, setLoading] = useState(false)

  const loadClub = useCallback(async () => {
    const clubsHome = clubs.find((club) => club.id === homeId)
    if (clubsHome) {
      setHomeClub(clubsHome)
    }
    const clubsAway = clubs.find((club) => club.id === awayId)
    if (clubsAway) {
      setAwayClub(clubsAway)
    }
  }, [awayId, clubs, homeId])

  useEffect(() => {
    loadClub()
  }, [loadClub])

  function handleGoDetailsCup() {
    navigate('detailsCup', { idCup })
  }

  async function handleSavePlacar() {
    try {
      setLoading(true)
      await saveMatchStats(stats)

      handleGoDetailsCup()
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Background>
      <Container>
        <TitleWithTouchBack title="Resultado" />
        <Content>
          <CardMatch>
            <Name>Placar Final</Name>
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
                  <Goal>{stats.goalHome}</Goal>
                  <VS>vs</VS>
                  <Goal>{stats.goalAway}</Goal>
                </Placar>
                <ViewClube position="flex-end">
                  <Name>{awayClub.name}</Name>
                </ViewClube>
              </InfoMatch>
            </Game>
          </CardMatch>
        </Content>
        <Button
          title="Cancelar resultado"
          type="Secundary"
          onPress={handleGoDetailsCup}
        />
        <Button
          title="Salvar resultado"
          loading={loading}
          style={{ marginTop: 20 }}
          onPress={handleSavePlacar}
        />
      </Container>
    </Background>
  )
}
