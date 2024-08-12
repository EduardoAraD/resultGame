import { MomentComplete } from '../../../Model/Moment'
import { emptyStats } from '../../../Model/Stats'
import { getMomentLongCross } from '../ChangeInGoal/getMomentLongCross'
import { getMomentShortCross } from '../ChangeInGoal/getMomentShortCross'
import { ChanceGoalMomentProps, ChanceGoalMomentReturn } from '../interfaces'

export function getCornerKickPlay({
  minute,
  domain,
  nameClub,
  homeOrAway,
}: ChanceGoalMomentProps): ChanceGoalMomentReturn {
  const momentStart: MomentComplete = {
    minute,
    narration: `Vai ser cobrado escanteio para o ${nameClub}.`,
    homeOrAway,
    stats: emptyStats,
    domainAway: domain.away,
    domainHome: domain.home,
    id: 0,
  }

  const numberRandom = Math.floor(Math.random() * 100)

  const isMomentShortCross = numberRandom < 30
  if (isMomentShortCross) {
    const momentShortPass: MomentComplete = {
      minute,
      narration: 'Faz o passe curto',
      homeOrAway,
      stats: emptyStats,
      domainAway: domain.away,
      domainHome: domain.home,
      id: 0,
    }

    const { moments, proxChance } = getMomentShortCross({
      minute,
      homeOrAway,
      nameClub,
      domain,
    })

    return {
      moments: [momentStart, momentShortPass, ...moments],
      proxChance,
    }
  }

  const { moments, proxChance } = getMomentLongCross({
    minute,
    homeOrAway,
    nameClub,
    domain,
  })

  return {
    moments: [momentStart, ...moments],
    proxChance,
  }
}
