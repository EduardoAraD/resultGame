import { ClubShort } from '../Model/Club'
import { ItemClassification } from '../Model/ItemClassification'
import { MatchComplete } from '../Model/Match'

import { getTypeItemClassification } from './getTypeItemClassification'

interface ClassificationProps {
  matchsOfSeason: MatchComplete[]
  clubs: ClubShort[]
  points: {
    win: number
    draw: number
    loss: number
  }
  numberClubsPromoted: number
  numberClubsRelegated: number
}

export function getClassification({
  matchsOfSeason,
  clubs,
  points,
  numberClubsPromoted,
  numberClubsRelegated,
}: ClassificationProps) {
  const listItemClassification: ItemClassification[] = clubs.map((club) => {
    const itemClassification: ItemClassification = {
      club,
      type: 'standard',
      goalsScored: 0,
      goalsConceded: 0,
      points: 0,
      games: 0,
      win: 0,
    }
    return itemClassification
  })

  matchsOfSeason.forEach((match) => {
    const findIndexListInClubHome = listItemClassification.findIndex(
      (itemC) => itemC.club.id === match.home.id,
    )
    const findIndexListInClubAway = listItemClassification.findIndex(
      (itemC) => itemC.club.id === match.away.id,
    )
    if (findIndexListInClubAway !== -1 && findIndexListInClubHome !== -1) {
      listItemClassification[findIndexListInClubHome].goalsScored +=
        match.stats.homeStats.goal
      listItemClassification[findIndexListInClubHome].goalsConceded +=
        match.stats.awayStats.goal
      listItemClassification[findIndexListInClubHome].games += 1
      listItemClassification[findIndexListInClubAway].goalsScored +=
        match.stats.awayStats.goal
      listItemClassification[findIndexListInClubAway].goalsConceded +=
        match.stats.homeStats.goal
      listItemClassification[findIndexListInClubAway].games += 1

      if (match.stats.homeStats.goal > match.stats.awayStats.goal) {
        listItemClassification[findIndexListInClubHome].points += points.win
        listItemClassification[findIndexListInClubHome].win += 1
        listItemClassification[findIndexListInClubAway].points += points.loss
      } else if (match.stats.homeStats.goal === match.stats.awayStats.goal) {
        listItemClassification[findIndexListInClubHome].points += points.draw
        listItemClassification[findIndexListInClubAway].points += points.draw
      } else {
        listItemClassification[findIndexListInClubAway].points += points.win
        listItemClassification[findIndexListInClubAway].win += 1
        listItemClassification[findIndexListInClubHome].points += points.loss
      }
    }
  })

  const classification = listItemClassification.sort((club1, club2) => {
    if (club1.points > club2.points) {
      return -1
    }
    if (club1.points < club2.points) {
      return 1
    }

    if (club1.win > club2.win) {
      return -1
    }
    if (club1.win < club2.win) {
      return 1
    }

    const club1DiffGoalsScoredGoalConceded =
      club1.goalsScored - club1.goalsConceded
    const club2DiffGoalsScoredGoalConceded =
      club2.goalsScored - club2.goalsConceded
    if (club1DiffGoalsScoredGoalConceded > club2DiffGoalsScoredGoalConceded) {
      return -1
    }
    if (club1DiffGoalsScoredGoalConceded < club2DiffGoalsScoredGoalConceded) {
      return 1
    }

    if (club1.goalsScored > club2.goalsScored) {
      return -1
    }
    return club1.goalsScored < club2.goalsScored ? 1 : 0
  })

  const numberClubsInClassification = classification.length
  return classification.map((item, index) => ({
    ...item,
    type: getTypeItemClassification({
      numberClubsPromoted,
      numberClubsInClassification,
      numberClubsRelegated,
      position: index + 1,
    }),
  }))
}
