import { MomentComplete } from '../../../Model/Moment'
import { emptyStats } from '../../../Model/Stats'
import { getMomentsDefensePlay } from '../FinishedMoments/getMomentDefense'
import { ChanceGoalMomentProps, ChanceGoalMomentReturn } from '../interfaces'
import { getMomentHeadKick } from './getMomentHeadKick'
import { getMomentShortKick } from './getMomentShortKick'

export function getMomentShortCross({
  minute,
  domain,
  nameClub,
  homeOrAway,
}: ChanceGoalMomentProps): ChanceGoalMomentReturn {
  const momentStart: MomentComplete = {
    minute,
    narration: `Faz o cruzamento curto.`,
    homeOrAway,
    stats: emptyStats,
    domainAway: domain.away,
    domainHome: domain.home,
    id: 0,
  }

  const numberRandom = Math.floor(Math.random() * 100)

  const isMomentHeadKick = numberRandom < 40
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

  const isMomentShortKick = numberRandom < 70
  if (isMomentShortKick) {
    const { moments, proxChance } = getMomentShortKick({
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

  const isMomentGoalkeeper = numberRandom < 80
  if (isMomentGoalkeeper) {
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

  const isMomentCornerKick = numberRandom < 90
  if (isMomentCornerKick) {
    const momentCorner: MomentComplete = {
      minute,
      narration: 'A defesa corta para linha de fundo. É escanteio!',
      homeOrAway,
      stats: emptyStats,
      domainAway: domain.away,
      domainHome: domain.home,
      id: 0,
    }

    return {
      moments: [momentStart, momentCorner],
      proxChance: 'CORNER KICK',
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
