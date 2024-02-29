import { useMemo } from 'react'
import { TouchableOpacityProps, View } from 'react-native'

import { MatchComplete, MatchStats, emptyMatchStats } from '../../Model/Match'

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

interface CardMatchProps extends TouchableOpacityProps {
  match: MatchComplete
}

export function CardMatch({ match, ...rest }: CardMatchProps) {
  const isTripMatch = match.statsTrip !== undefined
  const matchIsComplated = match.stats.status === 'finished'
  const sumPlacar: MatchStats = useMemo(() => {
    const statsTrip = match.statsTrip ? match.statsTrip : emptyMatchStats
    const status =
      match.stats.status === 'finished' ||
      (match.statsTrip !== undefined && match.statsTrip.status === 'finished')
        ? 'finished'
        : 'start'

    const stats: MatchStats = {
      id: '',
      goalHome: match.stats.goalHome + statsTrip.goalAway,
      goalAway: match.stats.goalAway + statsTrip.goalHome,
      goalAwayPenal: match.stats.goalAwayPenal + statsTrip.goalHomePenal,
      goalHomePenal: match.stats.goalHomePenal + statsTrip.goalAwayPenal,
      type: match.stats.type,
      status,
    }

    return stats
  }, [
    match.stats.goalAway,
    match.stats.goalAwayPenal,
    match.stats.goalHome,
    match.stats.goalHomePenal,
    match.stats.status,
    match.stats.type,
    match.statsTrip,
  ])

  const showPenal =
    sumPlacar.type !== 'Normal' &&
    sumPlacar.goalAway === sumPlacar.goalHome &&
    match.stats.status === 'finished'

  const goalHomeFirstMatch =
    match.statsTrip !== undefined && match.statsTrip.status === 'finished'
      ? match.statsTrip.goalAway
      : ''
  const goalHomeSecundsMatch =
    match.stats.status === 'finished' ? match.stats.goalHome : ''

  const goalAwayFirstMatch =
    match.statsTrip !== undefined && match.statsTrip.status === 'finished'
      ? match.statsTrip.goalHome
      : ''
  const goalAwaySecundsMatch =
    match.stats.status === 'finished' ? match.stats.goalAway : ''

  return (
    <Card activeOpacity={0.7} {...rest}>
      <ViewName>
        <Image source={match.home.logo} alt="" style={{ left: 0 }} />
        <Name numberOfLines={2}>{match.home.name}</Name>
      </ViewName>
      <Placar>
        {sumPlacar.status === 'start' ? (
          <Line />
        ) : (
          <>
            {isTripMatch && (
              <View>
                <TextGoalMult>{goalHomeFirstMatch}</TextGoalMult>
                <TextGoalMult>{goalHomeSecundsMatch}</TextGoalMult>
              </View>
            )}
            <Goal
              matchCompleted={matchIsComplated}
              style={{ textAlign: 'right' }}
            >
              {sumPlacar.goalHome}
            </Goal>
            {showPenal && <Penal>{sumPlacar.goalHomePenal}</Penal>}
            <Line />
            {showPenal && <Penal>{sumPlacar.goalAwayPenal}</Penal>}
            <Goal
              matchCompleted={matchIsComplated}
              style={{ textAlign: 'left' }}
            >
              {sumPlacar.goalAway}
            </Goal>
            {isTripMatch && (
              <View>
                <TextGoalMult>{goalAwayFirstMatch}</TextGoalMult>
                <TextGoalMult>{goalAwaySecundsMatch}</TextGoalMult>
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
