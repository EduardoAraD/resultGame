import { ClubShort } from '../Model/Club'
import { ItemClassification } from '../Model/ItemClassification'
import { MatchComplete } from '../Model/Match'

export function getClassification(
  gamesTemporada: MatchComplete[],
  listClubs: ClubShort[],
  points: {
    win: number
    draw: number
    loss: number
  },
) {
  const itemClassClubs: ItemClassification[] = listClubs.map((club) => {
    const itemClass: ItemClassification = {
      club,
      goalsScored: 0,
      goalsConceded: 0,
      points: 0,
      games: 0,
      win: 0,
    }
    return itemClass
  })

  gamesTemporada.forEach((gameDB) => {
    const findIndexHome = itemClassClubs.findIndex(
      (itemC) => itemC.club.id === gameDB.home.id,
    )
    const findIndexAway = itemClassClubs.findIndex(
      (itemC) => itemC.club.id === gameDB.away.id,
    )
    if (findIndexAway !== -1 && findIndexHome !== -1) {
      itemClassClubs[findIndexHome].goalsScored += gameDB.stats.goalHome
      itemClassClubs[findIndexHome].goalsConceded += gameDB.stats.goalAway
      itemClassClubs[findIndexHome].games += 1
      itemClassClubs[findIndexAway].goalsScored += gameDB.stats.goalAway
      itemClassClubs[findIndexAway].goalsConceded += gameDB.stats.goalHome
      itemClassClubs[findIndexAway].games += 1

      if (gameDB.stats.goalHome > gameDB.stats.goalAway) {
        itemClassClubs[findIndexHome].points += points.win
        itemClassClubs[findIndexHome].win += 1
        itemClassClubs[findIndexAway].points += points.loss
      } else if (gameDB.stats.goalHome === gameDB.stats.goalAway) {
        itemClassClubs[findIndexHome].points += points.draw
        itemClassClubs[findIndexAway].points += points.draw
      } else {
        itemClassClubs[findIndexAway].points += points.win
        itemClassClubs[findIndexAway].win += 1
        itemClassClubs[findIndexHome].points += points.loss
      }
    }
  })

  return itemClassClubs.sort((a, b) => {
    if (a.points > b.points) {
      return -1
    } else if (a.points < b.points) {
      return 1
    } else {
      if (a.win > b.win) {
        return -1
      } else if (a.win < b.win) {
        return 1
      } else {
        const saldoGoalA = a.goalsScored - a.goalsConceded
        const saldoGoalB = b.goalsScored - b.goalsConceded
        if (saldoGoalA > saldoGoalB) {
          return -1
        } else if (saldoGoalA < saldoGoalB) {
          return 1
        } else {
          if (a.goalsScored > b.goalsScored) {
            return -1
          } else {
            return a.goalsScored < b.goalsScored ? 1 : 0
          }
        }
      }
    }
  })
}
