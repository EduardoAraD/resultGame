import { useEffect, useState } from 'react'
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

import { ClubShort } from '../../Model/Club'
import { MatchStats } from '../../Model/Match'
import { StatsMatch } from '../StatsMatch'
import {
  CardMatch,
  Game,
  Goal,
  InfoMatch,
  LogoMatch,
  Name,
  Opacity,
  Penal,
  Placar,
  Stadium,
  VS,
  ViewClub,
} from './styles'

interface CardMatchResultProps {
  stadium: string
  home: ClubShort
  away: ClubShort
  stats: MatchStats
}

export function CardMatchResult({
  stadium,
  home,
  away,
  stats,
}: CardMatchResultProps) {
  const [openStats, setOpenStats] = useState(false)

  function handleOpenStats() {
    setOpenStats(!openStats)
  }

  const sharedProgress = useSharedValue(150)
  const styledAnimated = useAnimatedStyle(() => {
    return {
      height: sharedProgress.value,
    }
  })

  useEffect(() => {
    sharedProgress.value = withTiming(openStats ? 400 : 160)
  }, [openStats, sharedProgress])

  const hasPenalty =
    stats.homeStats.goalPenalty > 0 || stats.awayStats.goalPenalty > 0
  const isMatchFinished = stats.status === 'finished'
  const isDisabledCard = !isMatchFinished

  return (
    <CardMatch
      testID="card"
      activeOpacity={0.9}
      disabled={isDisabledCard}
      onPress={handleOpenStats}
    >
      <Stadium>{stadium}</Stadium>
      <Game style={isMatchFinished ? styledAnimated : {}}>
        <Opacity>
          <LogoMatch source={home.logo} alt="" />
          <LogoMatch source={away.logo} alt="" />
        </Opacity>

        <InfoMatch style={{ gap: stats.status === 'start' ? 10 : 0 }}>
          <ViewClub position="flex-start">
            <Name>{home.name}</Name>
          </ViewClub>
          <Placar>
            {isMatchFinished && <Goal>{stats.homeStats.goal}</Goal>}
            {hasPenalty && <Penal>{stats.homeStats.goalPenalty}</Penal>}
            <VS>vs</VS>
            {hasPenalty && <Penal>{stats.awayStats.goalPenalty}</Penal>}
            {isMatchFinished && <Goal>{stats.awayStats.goal}</Goal>}
          </Placar>
          <ViewClub position="flex-end">
            <Name>{away.name}</Name>
          </ViewClub>
        </InfoMatch>

        {isMatchFinished && openStats && (
          <StatsMatch
            homeInfo={{
              logo: home.logo,
              stats: stats.homeStats,
            }}
            awayInfo={{
              logo: away.logo,
              stats: stats.awayStats,
            }}
            hasPenalt={hasPenalty}
            showGoal={false}
            showLogos={false}
          />
        )}
      </Game>
    </CardMatch>
  )
}
