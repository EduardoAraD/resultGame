import { MomentComplete } from '../../../Model/Moment'
import { emptyStats } from '../../../Model/Stats'
import { getMomentShortKick } from '../ChangeInGoal/getMomentShortKick'
import { getMomentsDefensePlay } from '../FinishedMoments/getMomentDefense'
import { ChanceGoalMomentProps, ChanceGoalMomentReturn } from '../interfaces'

export function getDeepPass({
  minute,
  homeOrAway,
  domain,
  nameClub,
}: ChanceGoalMomentProps): ChanceGoalMomentReturn {
  const momentStart: MomentComplete = {
    minute,
    narration: 'Tenta fazer o passe em profundidade.',
    homeOrAway,
    stats: emptyStats,
    domainAway: domain.away,
    domainHome: domain.home,
    id: 0,
  }

  const numberRandom = Math.floor(Math.random() * 100)

  const isMomentShortKick = numberRandom < 35
  if (isMomentShortKick) {
    const momentDeepPass: MomentComplete = {
      minute,
      narration: `Fez o passe nas costas da defesa. O ${nameClub} parte para o gol`,
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
      moments: [momentStart, momentDeepPass, ...moments],
      proxChance,
    }
  }

  const isMomentShortFree = numberRandom < 50
  if (isMomentShortFree) {
    const momentShortFree: MomentComplete = {
      minute,
      narration: 'Isso é falta! Derrubaram o jogador na hora do passe.',
      homeOrAway,
      stats: emptyStats,
      domainAway: domain.away,
      domainHome: domain.home,
      id: 0,
    }

    return {
      moments: [momentStart, momentShortFree],
      proxChance: 'SHORT FREE',
    }
  }

  const momentDefensePlay = getMomentsDefensePlay({
    minute,
    defense: 'completed',
    domain,
    homeOrAway,
    type: 'WRONG PASS',
  })

  return {
    moments: [momentStart, momentDefensePlay],
    proxChance: 'STANTARD',
  }
}
