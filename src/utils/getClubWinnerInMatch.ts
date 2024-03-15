import { MatchStats, emptyMatchStats } from '../Model/Match'

interface WinnerClubInMatchProps {
  matchStatsHomeVsAway: MatchStats
  matchStatsTripAwayVsHome?: MatchStats
  homeClubId: string
  awayClubId: string
}

export function getWinnerClubInTwoMatch({
  matchStatsHomeVsAway,
  matchStatsTripAwayVsHome = emptyMatchStats,
  homeClubId,
  awayClubId,
}: WinnerClubInMatchProps) {
  const sumMatchStats = {
    home: {
      goal:
        matchStatsHomeVsAway.homeStats.goal +
        matchStatsTripAwayVsHome.awayStats.goal,
      goalPenalty:
        matchStatsHomeVsAway.homeStats.goalPenalty +
        matchStatsTripAwayVsHome.awayStats.goalPenalty,
    },
    away: {
      goal:
        matchStatsHomeVsAway.awayStats.goal +
        matchStatsTripAwayVsHome.homeStats.goal,
      goalPenalty:
        matchStatsHomeVsAway.awayStats.goalPenalty +
        matchStatsTripAwayVsHome.homeStats.goalPenalty,
    },
  }
  if (sumMatchStats.home.goal > sumMatchStats.away.goal) {
    return homeClubId
  }
  if (sumMatchStats.home.goal < sumMatchStats.away.goal) {
    return awayClubId
  }

  if (sumMatchStats.home.goalPenalty > sumMatchStats.away.goalPenalty) {
    return homeClubId
  }
  return awayClubId
}
