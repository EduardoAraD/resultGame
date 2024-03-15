import { Moment } from '../Model/Moment'
import { emptyStats } from '../Model/Stats'

interface MomentsPenaltyGoalProps {
  overallClub: number
  overallAll: number
  nameClube: string
  homeOrAway: 'home' | 'away'
  numberOfPenalt: number
}

export function getMomentsOnPenaltyGoalChance({
  overallAll,
  overallClub,
  homeOrAway,
  nameClube,
  numberOfPenalt,
}: MomentsPenaltyGoalProps) {
  const momentStart: Moment = {
    minute: 90,
    narration: `${nameClube} para sua ${numberOfPenalt}° cobrança`,
    homeOrAway,
    stats: emptyStats,
  }

  const MAX_PORCENTAGE_GOAL = 75

  const overallAdversaryClub = overallAll - overallClub
  const porcentageGoalCompareClubs =
    (MAX_PORCENTAGE_GOAL * overallClub) / overallAdversaryClub

  const goalPercentageChance =
    overallClub > overallAdversaryClub
      ? MAX_PORCENTAGE_GOAL
      : porcentageGoalCompareClubs

  const numberRandomToCompare = Math.floor(Math.random() * 100)

  const isMissedPenalty = numberRandomToCompare > goalPercentageChance

  if (isMissedPenalty) {
    const moment: Moment = {
      minute: 90,
      narration: 'Perdeu o Penalti',
      isPenaltyShots: true,
      homeOrAway,
      stats: {
        ...emptyStats,
        numberPenalties: 1,
      },
    }
    return [momentStart, moment]
  }

  const moment: Moment = {
    minute: 90,
    narration: `Gol de Penalti`,
    isPenaltyShots: true,
    homeOrAway,
    stats: {
      ...emptyStats,
      goalPenalty: 1,
      numberPenalties: 1,
    },
  }
  return [momentStart, moment]
}
