import { MatchComplete, emptyMatchStats } from '../Model/Match'
import { Round } from '../Model/Round'
// import { getRoundsCup, saveRoundsInCup } from '../lib/asyncstorage/matchs'
import { getWinnerClubInTwoMatch } from './getClubWinnerInMatch'

interface ClassificationClubToProxRoundProps {
  match: MatchComplete
  rounds: Round[]
}

export function classificationClubToProxRound({
  match,
  rounds,
}: ClassificationClubToProxRoundProps) {
  const indexRoundCurrentByMatch = rounds.findIndex((round) => {
    const existyMatch =
      round.matchs.findIndex(
        (matchRound) => matchRound.idStats === match.stats.id,
      ) !== -1
    return existyMatch
  })

  if (indexRoundCurrentByMatch !== -1) {
    const isFinishedMatch =
      match.stats.status === 'finished' &&
      (match.statsTrip === undefined || match.statsTrip.status === 'finished')

    if (isFinishedMatch) {
      const statsTrip =
        match.statsTrip !== undefined ? match.statsTrip : emptyMatchStats
      const idClubWinner = getWinnerClubInTwoMatch({
        matchStatsHomeVsAway: match.stats,
        matchStatsTripAwayVsHome: statsTrip,
        homeClubId: match.home.id,
        awayClubId: match.away.id,
      })

      const roundCurrent = rounds[indexRoundCurrentByMatch]
      const findIndexOfMatch = roundCurrent.matchs.findIndex(
        (mat) => mat.idStats === match.stats.id,
      )
      const indexOfMatchOnProxRound = findIndexOfMatch / 2
      const isClubOnPlayHome = indexOfMatchOnProxRound % 1 === 0

      if (roundCurrent.cod === 'semi') {
        if (isClubOnPlayHome) {
          rounds[0].matchs[0].homeIdClub = idClubWinner
        } else {
          rounds[0].matchs[0].awayIdClub = idClubWinner
        }
        const hasThirdPlace = rounds.length > 1 && rounds[1].cod === 'third'
        if (hasThirdPlace) {
          const isClubLosser =
            match.home.id === idClubWinner ? match.away.id : match.home.id
          if (isClubOnPlayHome) {
            rounds[1].matchs[0].homeIdClub = isClubLosser
          } else {
            rounds[1].matchs[0].awayIdClub = isClubLosser
          }
        }
      } else if (roundCurrent.cod !== 'final' && roundCurrent.cod !== 'third') {
        const index = Math.floor(indexOfMatchOnProxRound)
        if (isClubOnPlayHome) {
          rounds[indexRoundCurrentByMatch - 1].matchs[index].homeIdClub =
            idClubWinner
        } else {
          rounds[indexRoundCurrentByMatch - 1].matchs[index].awayIdClub =
            idClubWinner
        }
      }
    }
  }
  return rounds
}
