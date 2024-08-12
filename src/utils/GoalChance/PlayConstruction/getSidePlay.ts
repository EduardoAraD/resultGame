import { MomentComplete } from '../../../Model/Moment'
import { emptyStats } from '../../../Model/Stats'
import { getMomentLongCross } from '../ChangeInGoal/getMomentLongCross'
import { getMomentPassBack } from '../ChangeInGoal/getMomentPassBack'
import { getMomentShortCross } from '../ChangeInGoal/getMomentShortCross'
import { getMomentsDefensePlay } from '../FinishedMoments/getMomentDefense'
import { ChanceGoalMomentProps, ChanceGoalMomentReturn } from '../interfaces'

export function getSidePlay({
  domain,
  nameClub,
  minute,
  homeOrAway,
}: ChanceGoalMomentProps): ChanceGoalMomentReturn {
  const numberRandom = Math.floor(Math.random() * 100)

  const isSideLeftPlay = numberRandom < 50
  const momentStart: MomentComplete = {
    minute,
    narration: `Consegui o domínio pela ponta ${isSideLeftPlay ? 'esquerda' : 'direita'}.`,
    homeOrAway,
    stats: emptyStats,
    domainAway: domain.away,
    domainHome: domain.home,
    id: 0,
  }

  const momentDribble: MomentComplete = {
    minute,
    narration: 'O jogador faz o dribe e parte para a grande área.',
    homeOrAway,
    stats: emptyStats,
    domainAway: domain.away,
    domainHome: domain.home,
    id: 0,
  }

  const isMomentPassBack = numberRandom < 15
  if (isMomentPassBack) {
    const { moments, proxChance } = getMomentPassBack({
      minute,
      homeOrAway,
      nameClub,
      domain,
    })

    return {
      moments: [momentStart, momentDribble, ...moments],
      proxChance,
    }
  }

  const isMomentShortCross = numberRandom < 30
  if (isMomentShortCross) {
    const { moments, proxChance } = getMomentShortCross({
      minute,
      homeOrAway,
      nameClub,
      domain,
    })

    return {
      moments: [momentStart, momentDribble, ...moments],
      proxChance,
    }
  }

  const isMomentLongCross = numberRandom < 85
  if (isMomentLongCross) {
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

  const momentDefensePlay = getMomentsDefensePlay({
    minute,
    defense: 'completed',
    domain,
    homeOrAway,
    type: 'RECOVER BALL',
  })

  return {
    moments: [momentStart, momentDefensePlay],
    proxChance: 'STANTARD',
  }
}
