import { MatchComplete } from '../../../../../Model/Match'

import {
  Card,
  Goal,
  Image,
  Info,
  Name,
  Penal,
  Placar,
  ViewName,
} from './styles'

interface PlacarTableProps {
  match: MatchComplete
}

export function PlacarTable({ match }: PlacarTableProps) {
  const finishedStatsTrip =
    match.statsTrip !== undefined
      ? match.statsTrip.status === 'finished'
      : false
  const finishedStats = match.stats.status === 'finished'

  return (
    <Card>
      <Info>
        <ViewName>
          <Image source={match.home.logo} alt="" />
          <Name numberOfLines={1}>{match.home.name}</Name>
        </ViewName>
        <ViewName>
          <Image source={match.away.logo} alt="" />
          <Name numberOfLines={1}>{match.away.name}</Name>
        </ViewName>
      </Info>
      {match.statsTrip !== undefined && (
        <Placar>
          <Goal>{finishedStatsTrip ? match.statsTrip.goalAway : '  '}</Goal>
          <Goal>{finishedStatsTrip ? match.statsTrip.goalHome : '  '}</Goal>
        </Placar>
      )}
      <Placar>
        <Goal>{finishedStats ? match.stats.goalHome : '  '}</Goal>
        <Goal>{finishedStats ? match.stats.goalAway : '  '}</Goal>
      </Placar>
      {match.stats.goalAwayPenal + match.stats.goalHomePenal > 0 && (
        <Penal>
          <Goal>{match.stats.goalHomePenal}</Goal>
          <Goal>{match.stats.goalAwayPenal}</Goal>
        </Penal>
      )}
    </Card>
  )
}
