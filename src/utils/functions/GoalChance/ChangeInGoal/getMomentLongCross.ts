import { MomentComplete } from '../../../../Model/Moment'
import { emptyStats } from '../../../../Model/Stats'
import { getMomentsDefensePlay } from '../FinishedMoments/getMomentDefense'
import { ChanceGoalMomentProps, ChanceGoalMomentReturn } from '../interfaces'
import { getMomentHeadKick } from './getMomentHeadKick'

export function getMomentLongCross({
  minute,
  domain,
  nameClub,
  homeOrAway,
}: ChanceGoalMomentProps): ChanceGoalMomentReturn {
  const numberRandom = Math.floor(Math.random() * 100)

  const isCrossFirstPost = numberRandom > 50
  const momentStart: MomentComplete = {
    minute,
    narration: `O ${nameClub} faz o cruzamento na ${isCrossFirstPost ? 'primeira' : 'segunda'} trave.`,
    homeOrAway,
    stats: emptyStats,
    domainAway: domain.away,
    domainHome: domain.home,
    id: 0,
  }

  const isMomentDefenseGoalkeeper = numberRandom < 20
  if (isMomentDefenseGoalkeeper) {
    const momentDefensePlay = getMomentsDefensePlay({
      minute,
      defense: 'completed',
      domain,
      homeOrAway,
      type: 'GOALKEEPER',
    })

    return {
      moments: [momentStart, momentDefensePlay],
      proxChance: 'STANTARD',
    }
  }

  const isMomentHeadKick = numberRandom < 70
  if (isMomentHeadKick) {
    const { moments, proxChance } = getMomentHeadKick({
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
    defense: 'partial',
    domain,
    homeOrAway,
    type: 'DEFENSE',
  })

  return {
    moments: [momentStart, momentDefensePlay],
    proxChance: 'STANTARD',
  }
}
