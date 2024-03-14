import { useEffect, useState } from 'react'
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

import { ClubComplete, ClubShort } from '../../Model/Club'
import { MatchStats } from '../../Model/Match'
import { StatsGame } from '../StatsGame'
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
  home: ClubComplete
  away: ClubShort
  stats: MatchStats
}

export function CardMatchResult({ home, away, stats }: CardMatchResultProps) {
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

  const hasPenal = stats.goalAwayPenal > 0 || stats.goalHomePenal > 0
  const matchIsFinished = stats.status === 'finished'

  return (
    <CardMatch
      activeOpacity={0.9}
      disabled={!matchIsFinished}
      onPress={handleOpenStats}
    >
      <Stadium>{home.stadium}</Stadium>
      <Game style={matchIsFinished ? styledAnimated : {}}>
        <Opacity>
          <LogoMatch source={home.logo} alt="" />
          <LogoMatch source={away.logo} alt="" />
        </Opacity>
        <InfoMatch style={{ gap: stats.status === 'start' ? 10 : 0 }}>
          <ViewClub position="flex-start">
            <Name>{home.name}</Name>
          </ViewClub>
          <Placar>
            {matchIsFinished && <Goal>{stats.goalHome}</Goal>}
            {hasPenal && <Penal>{stats.goalHomePenal}</Penal>}
            <VS>vs</VS>
            {hasPenal && <Penal>{stats.goalAwayPenal}</Penal>}
            {matchIsFinished && <Goal>{stats.goalAway}</Goal>}
          </Placar>
          <ViewClub position="flex-end">
            <Name>{away.name}</Name>
          </ViewClub>
        </InfoMatch>
        {matchIsFinished && openStats && (
          <StatsGame
            logoHome={home.logo}
            logoAway={away.logo}
            statsAway={stats.awayStats}
            statsHome={stats.homeStats}
            goalAway={stats.goalAway}
            goalHome={stats.goalHome}
            goalPenalAway={stats.goalAwayPenal}
            goalPenalHome={stats.goalHomePenal}
            hasPenalt={hasPenal}
            showGoal={false}
            showLogos={false}
          />
        )}
      </Game>
    </CardMatch>
  )
}
