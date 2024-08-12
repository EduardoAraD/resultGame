import { MomentComplete } from '../../../Model/Moment'
import { emptyStats } from '../../../Model/Stats'
import { getMomentShortKick } from '../ChangeInGoal/getMomentShortKick'
import { getMomentsDefensePlay } from '../FinishedMoments/getMomentDefense'
import { ChanceGoalMomentProps, ChanceGoalMomentReturn } from '../interfaces'

export function getDeepLaunchCentral({
  minute,
  homeOrAway,
  domain,
  nameClub,
}: ChanceGoalMomentProps): ChanceGoalMomentReturn {
  const momentStart: MomentComplete = {
    minute,
    narration: 'Faz o lançamento em profundidade atrás da defesa.',
    homeOrAway,
    stats: emptyStats,
    domainAway: domain.away,
    domainHome: domain.home,
    id: 0,
  }

  const numberRandom = Math.floor(Math.random() * 100)

  const isMomentStrongLaunch = numberRandom < 40
  if (isMomentStrongLaunch) {
    const momentDefensePlay = getMomentsDefensePlay({
      minute,
      homeOrAway,
      defense: 'completed',
      domain,
      type: 'STRONG LAUNCH',
    })

    return {
      moments: [momentStart, momentDefensePlay],
      proxChance: 'STANTARD',
    }
  }

  const isMomentDefense = numberRandom < 75
  if (isMomentDefense) {
    const momentDefensePlay = getMomentsDefensePlay({
      minute,
      homeOrAway,
      defense: 'partial',
      domain,
      type: 'DEFENSE',
    })

    return {
      moments: [momentStart, momentDefensePlay],
      proxChance: 'STANTARD',
    }
  }

  const momentDomainBall: MomentComplete = {
    minute,
    narration: 'O jogador domina e parte para o gol.',
    homeOrAway,
    stats: emptyStats,
    domainAway: domain.away,
    domainHome: domain.home,
    id: 0,
  }

  const { moments, proxChance } = getMomentShortKick({
    minute,
    homeOrAway,
    nameClub,
    domain,
  })

  return {
    moments: [momentStart, momentDomainBall, ...moments],
    proxChance,
  }
}
