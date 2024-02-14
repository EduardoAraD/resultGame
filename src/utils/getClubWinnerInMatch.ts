import { MatchStats } from '../Model/Match'

export function getWinnerClubInMatch(
  stats: MatchStats,
  statsTrip: MatchStats,
  homeId: string,
  awayId: string,
) {
  const sumStats: MatchStats = {
    goalHome: stats.goalHome + statsTrip.goalAway,
    goalAway: stats.goalAway + statsTrip.goalHome,
    goalHomePenal: stats.goalHomePenal + statsTrip.goalAwayPenal,
    goalAwayPenal: stats.goalAwayPenal + statsTrip.goalHomePenal,
    id: '',
    type: 'Mata-Mata',
    status: 'finished',
  }
  if (sumStats.goalHome > sumStats.goalAway) {
    return homeId
  } else if (sumStats.goalHome < sumStats.goalAway) {
    return awayId
  } else {
    if (sumStats.goalHomePenal > sumStats.goalAwayPenal) {
      return homeId
    } else {
      return awayId
    }
  }
}
