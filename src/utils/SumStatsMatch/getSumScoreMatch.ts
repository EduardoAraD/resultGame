import { MatchComplete, MatchStats, emptyMatchStats } from '../../Model/Match'
import { getSumStats } from './getSumStats/getSumStats'

interface GetSumScoreMatchProps {
  match: MatchComplete
}

interface GetSumScoreMatchReturn {
  stats: MatchStats
}

export function getSumScoreMatch({
  match,
}: GetSumScoreMatchProps): GetSumScoreMatchReturn {
  const statsTrip = match.statsTrip
    ? match.statsTrip
    : { ...emptyMatchStats, status: 'finished' }

  const isStatsMatchFinished = match.stats.status === 'finished'
  const isStatsTripMatchFinished = statsTrip.status === 'finished'

  const status =
    isStatsMatchFinished && isStatsTripMatchFinished ? 'finished' : 'start'

  const statsHome = getSumStats({
    stats: match.stats.homeStats,
    statsTrip: statsTrip.awayStats,
  })

  const statsAway = getSumStats({
    stats: match.stats.awayStats,
    statsTrip: statsTrip.homeStats,
  })

  const stats: MatchStats = {
    id: match.stats.id,
    type: match.stats.type,
    status,
    homeStats: statsHome.sumStats,
    awayStats: statsAway.sumStats,
  }

  return {
    stats,
  }
}
