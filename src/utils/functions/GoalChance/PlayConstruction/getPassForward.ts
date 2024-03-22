import { MomentComplete } from '../../../../Model/Moment'
import { emptyStats } from '../../../../Model/Stats'
import { getMomentKick } from '../ChangeInGoal/getMomentKick'
import { getMomentLongKick } from '../ChangeInGoal/getMomentLongKick'
import { getMomentsDefensePlay } from '../FinishedMoments/getMomentDefense'
import { ChanceGoalMomentProps, ChanceGoalMomentReturn } from '../interfaces'

export function getPassForwardPlay({
  minute,
  nameClub,
  homeOrAway,
  domain,
}: ChanceGoalMomentProps): ChanceGoalMomentReturn {
  const momentStart: MomentComplete = {
    minute,
    narration: 'Tenta fazer o passe para frente.',
    homeOrAway,
    stats: emptyStats,
    domainAway: domain.away,
    domainHome: domain.home,
    id: 0,
  }

  const numberRandom = Math.floor(Math.random() * 100)

  const isMomentWrongPass = numberRandom < 15
  if (isMomentWrongPass) {
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

  const isMomentKick = numberRandom < 50
  if (isMomentKick) {
    const momentBeforeKick: MomentComplete = {
      minute,
      narration: 'Faz a tabela e acha uma oportunidade para chute.',
      homeOrAway,
      stats: emptyStats,
      domainAway: domain.away,
      domainHome: domain.home,
      id: 0,
    }

    const { moments, proxChance } = getMomentKick({
      minute,
      homeOrAway,
      nameClub,
      domain,
    })

    return {
      moments: [momentStart, momentBeforeKick, ...moments],
      proxChance,
    }
  }

  const isMomentLongFree = numberRandom < 60
  if (isMomentLongFree) {
    const momentLongFree: MomentComplete = {
      minute,
      narration: 'Falta marcada! Uma chegada forte no jogador',
      homeOrAway,
      stats: emptyStats,
      domainAway: domain.away,
      domainHome: domain.home,
      id: 0,
    }

    return {
      moments: [momentStart, momentLongFree],
      proxChance: 'LONG FREE',
    }
  }

  const { moments, proxChance } = getMomentLongKick({
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
