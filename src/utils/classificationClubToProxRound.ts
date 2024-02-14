import { MatchComplete, emptyMatchStats } from '../Model/Match'
import { getRoundsCup, saveRoundsInCup } from '../lib/asyncstorage/matchs'
import { getWinnerClubInMatch } from './getClubWinnerInMatch'

interface RoundMatch {
  numberRound: number
  maxRound: number
}

export async function classificationClubToProxRound(
  match: MatchComplete,
  idCup: string,
  round: RoundMatch,
) {
  if (match !== undefined) {
    const rounds = await getRoundsCup(idCup)
    const indexRound = round.maxRound - round.numberRound

    if (
      match.stats.status === 'finished' &&
      (match.statsTrip === undefined || match.statsTrip.status === 'finished')
    ) {
      const statsTrip =
        match.statsTrip !== undefined ? match.statsTrip : emptyMatchStats
      const idClubWinner = getWinnerClubInMatch(
        match.stats,
        statsTrip,
        match.home.id,
        match.away.id,
      )

      const roundCurrent = rounds[indexRound]
      const findIndex = roundCurrent.matchs.findIndex(
        (mat) => mat.idStats === match.stats.id,
      )
      const calc = findIndex / 2

      if (roundCurrent.cod === 'SF') {
        if (calc % 1 === 0) {
          rounds[0].matchs[0].homeIdClub = idClubWinner
        } else {
          rounds[0].matchs[0].awayIdClub = idClubWinner
        }
        if (rounds.length > 1 && rounds[1].cod === 'T') {
          const isClubLosser =
            match.home.id === idClubWinner ? match.away.id : match.home.id
          if (calc % 1 === 0) {
            rounds[1].matchs[0].homeIdClub = isClubLosser
          } else {
            rounds[1].matchs[0].awayIdClub = isClubLosser
          }
        }
      } else if (roundCurrent.cod !== 'F' && roundCurrent.cod !== 'T') {
        const index = Math.floor(calc)
        if (calc % 1 === 0) {
          rounds[indexRound - 1].matchs[index].homeIdClub = idClubWinner
        } else {
          rounds[indexRound - 1].matchs[index].awayIdClub = idClubWinner
        }
      }
      await saveRoundsInCup(rounds, idCup)
    }
  }
}
