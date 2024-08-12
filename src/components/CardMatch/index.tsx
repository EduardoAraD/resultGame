import { useMemo } from 'react'
import { TouchableOpacityProps, View } from 'react-native'

import { MatchComplete, MatchStats } from '../../Model/Match'

import {
  Card,
  Goal,
  Image,
  Line,
  Name,
  Penal,
  Placar,
  TextGoalMult,
  ViewName,
} from './styles'
import { getSumScoreMatch } from '../../utils/SumStatsMatch/getSumScoreMatch'

interface CardMatchProps extends TouchableOpacityProps {
  match: MatchComplete
}

export function CardMatch({ match, ...rest }: CardMatchProps) {
  const isTripMatch = match.statsTrip !== undefined
  const matchIsComplated = match.stats.status === 'finished'

  const sumScoredMatch: MatchStats = useMemo(() => {
    const { stats } = getSumScoreMatch({
      match,
    })

    return stats
  }, [match])

  const showPenal =
    sumScoredMatch.homeStats.goalPenalty > 0 ||
    sumScoredMatch.awayStats.goalPenalty > 0

  const isFirstMatchFinished =
    match.statsTrip !== undefined && match.statsTrip.status === 'finished'
  const isSecundMatchFinished = match.stats.status === 'finished'

  const goalHomeFirstMatch = isFirstMatchFinished
    ? match.statsTrip?.awayStats.goal
    : ''
  const goalHomeSecundMatch = isSecundMatchFinished
    ? match.stats.homeStats.goal
    : ''
  const goalAwayFirstMatch = isFirstMatchFinished
    ? match.statsTrip?.homeStats.goal
    : ''
  const goalAwaySecundMatch = isSecundMatchFinished
    ? match.stats.awayStats.goal
    : ''

  const isMatchNotFinished = sumScoredMatch.status !== 'finished'

  return (
    <Card activeOpacity={0.7} {...rest}>
      <ViewName>
        <Image source={match.home.logo} alt="" style={{ left: 0 }} />
        <Name numberOfLines={2}>{match.home.name}</Name>
      </ViewName>
      <Placar>
        {isMatchNotFinished ? (
          <Line />
        ) : (
          <>
            {isTripMatch && (
              <View>
                <TextGoalMult>{goalHomeFirstMatch}</TextGoalMult>
                <TextGoalMult>{goalHomeSecundMatch}</TextGoalMult>
              </View>
            )}
            <Goal
              matchCompleted={matchIsComplated}
              style={{ textAlign: 'right' }}
            >
              {sumScoredMatch.homeStats.goal}
            </Goal>
            {showPenal && <Penal>{sumScoredMatch.homeStats.goalPenalty}</Penal>}
            <Line />
            {showPenal && <Penal>{sumScoredMatch.awayStats.goalPenalty}</Penal>}
            <Goal
              matchCompleted={matchIsComplated}
              style={{ textAlign: 'left' }}
            >
              {sumScoredMatch.awayStats.goal}
            </Goal>
            {isTripMatch && (
              <View>
                <TextGoalMult>{goalAwayFirstMatch}</TextGoalMult>
                <TextGoalMult>{goalAwaySecundMatch}</TextGoalMult>
              </View>
            )}
          </>
        )}
      </Placar>
      <ViewName>
        <Name numberOfLines={2}>{match.away.name}</Name>
        <Image source={match.away.logo} alt="" style={{ right: 0 }} />
      </ViewName>
    </Card>
  )
}
