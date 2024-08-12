import { MomentComplete } from '../../../Model/Moment'
import { emptyStats } from '../../../Model/Stats'
import { getMomentsDefensePlay } from '../FinishedMoments/getMomentDefense'
import { ChanceGoalMomentProps, ChanceGoalMomentReturn } from '../interfaces'
import { getSidePlay } from './getSidePlay'

export function getDeepLauchSide({
  minute,
  homeOrAway,
  domain,
  nameClub,
}: ChanceGoalMomentProps): ChanceGoalMomentReturn {
  const momentStart: MomentComplete = {
    minute,
    narration: 'Faz o lançamento em profundidade pela ponta.',
    homeOrAway,
    stats: emptyStats,
    domainAway: domain.away,
    domainHome: domain.home,
    id: 0,
  }

  const numberRandom = Math.floor(Math.random() * 100)

  const isMomentStrongLaunch = numberRandom < 10
  if (isMomentStrongLaunch) {
    const momentDefensePlay = getMomentsDefensePlay({
      minute,
      homeOrAway,
      defense: 'completed',
      domain,
      type: 'STRONG LAUNCH SIDE',
    })

    return {
      moments: [momentStart, momentDefensePlay],
      proxChance: 'STANTARD',
    }
  }

  const isMomentDefense = numberRandom < 20
  if (isMomentDefense) {
    const momentDefensePlay = getMomentsDefensePlay({
      minute,
      defense: 'completed',
      domain,
      homeOrAway,
      type: 'DEFENSE INTERCEPTS',
    })

    return {
      moments: [momentStart, momentDefensePlay],
      proxChance: 'STANTARD',
    }
  }

  const { moments, proxChance } = getSidePlay({
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
