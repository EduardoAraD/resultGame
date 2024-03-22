import { MomentComplete } from '../../../../Model/Moment'
import { emptyStats } from '../../../../Model/Stats'
import { getMomentsDefensePlay } from '../FinishedMoments/getMomentDefense'
import { ChanceGoalMomentProps, ChanceGoalMomentReturn } from '../interfaces'
import { getMomentKick } from './getMomentKick'
import { getMomentShortKick } from './getMomentShortKick'

export function getMomentPassBack({
  minute,
  domain,
  nameClub,
  homeOrAway,
}: ChanceGoalMomentProps): ChanceGoalMomentReturn {
  const momentStart: MomentComplete = {
    minute,
    narration: 'Chega a linha de fundo e faz o passe para trás.',
    homeOrAway,
    stats: emptyStats,
    domainAway: domain.away,
    domainHome: domain.home,
    id: 0,
  }

  const numberRandom = Math.floor(Math.random() * 100)
  const isMomentShortKick = numberRandom < 30
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

  const isMomentKick = numberRandom < 40
  if (isMomentKick) {
    const { moments, proxChance } = getMomentKick({
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
      narration: 'A defesa corta para linha de fundo. É escanteio',
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
