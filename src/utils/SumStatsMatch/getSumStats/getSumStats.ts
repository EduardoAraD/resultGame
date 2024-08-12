import { Stats } from '../../../Model/Stats'

interface GetSumStatsProps {
  stats: Stats
  statsTrip: Stats
}

interface GetSumStatsReturn {
  sumStats: Stats
}

export function getSumStats({
  stats,
  statsTrip,
}: GetSumStatsProps): GetSumStatsReturn {
  const sumStats: Stats = {
    goal: stats.goal + statsTrip.goal,
    goalPenalty: stats.goalPenalty + statsTrip.goalPenalty,
    shotsBlocked: stats.shotsBlocked + statsTrip.shotsBlocked,
    shotsOnGoal: stats.shotsOnGoal + statsTrip.shotsOnGoal,
    shotsOut: stats.shotsOut + statsTrip.shotsOut,
    possession: stats.possession + statsTrip.possession,
    expectedGoal: stats.expectedGoal + statsTrip.expectedGoal,
    numberPenalties: stats.numberPenalties + statsTrip.numberPenalties,
  }

  return {
    sumStats,
  }
}
