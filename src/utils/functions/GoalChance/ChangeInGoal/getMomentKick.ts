import { MomentComplete } from '../../../../Model/Moment'
import { emptyStats } from '../../../../Model/Stats'
import { getMomentsDefensePlay } from '../FinishedMoments/getMomentDefense'
import { getMomentGoal } from '../FinishedMoments/getMomentGoal'
import { getNarrationDefenseGoalkeeper } from '../NarrationMoments/getNarrationDefenseGoalkeeper'
import { ChanceGoalMomentProps, ChanceGoalMomentReturn } from '../interfaces'
import { getMomentReboundKick } from './getMomentReboudKick'

export function getMomentKick({
  minute,
  nameClub,
  homeOrAway,
  domain,
}: ChanceGoalMomentProps): ChanceGoalMomentReturn {
  const momentStart: MomentComplete = {
    minute,
    narration: 'O jogador faz o chute',
    homeOrAway,
    stats: emptyStats,
    domainAway: domain.away,
    domainHome: domain.home,
    id: 0,
  }

  const numberRandom = Math.floor(Math.random() * 100)
  const expectedGoalKick = 0.3 // 0.25

  const isMomentReboundKick = numberRandom < 10
  if (isMomentReboundKick) {
    const momentGoalkeeperPalm: MomentComplete = {
      minute,
      narration: 'Espalma o goleiro.',
      homeOrAway,
      stats: { ...emptyStats, shotsOnGoal: 1, expectedGoal: expectedGoalKick },
      domainAway: domain.away,
      domainHome: domain.home,
      id: 0,
    }

    const { moments, proxChance } = getMomentReboundKick({
      minute,
      domain,
      homeOrAway,
      nameClub,
    })

    return {
      moments: [momentStart, momentGoalkeeperPalm, ...moments],
      proxChance,
    }
  }

  const isMomentShotsOut = numberRandom < 20
  if (isMomentShotsOut) {
    const momentsDefensePlay = getMomentsDefensePlay({
      minute,
      domain,
      defense: 'completed',
      homeOrAway,
      type: 'KICK OUT',
      stats: { ...emptyStats, shotsOut: 1, expectedGoal: expectedGoalKick },
    })

    return {
      moments: [momentStart, momentsDefensePlay],
      proxChance: 'STANTARD',
    }
  }

  const isMomentShotsBlocked = numberRandom < 30
  if (isMomentShotsBlocked) {
    const momentShotsOut = getMomentsDefensePlay({
      minute,
      defense: 'partial',
      homeOrAway,
      domain,
      type: 'KICK BLOCKED',
      stats: { ...emptyStats, shotsBlocked: 1, expectedGoal: expectedGoalKick },
    })

    return {
      moments: [momentStart, momentShotsOut],
      proxChance: 'STANTARD',
    }
  }

  const isMomentShortFree = numberRandom < 45
  if (isMomentShortFree) {
    const momentShortFree: MomentComplete = {
      minute,
      narration: 'Falta marcada! O jogador foi derrubado na hora de chutar',
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

  const isMomentDefenseGoalkeeperAndCornerKick = numberRandom < 60
  if (isMomentDefenseGoalkeeperAndCornerKick) {
    const momentDefenseGoalkeeper: MomentComplete = {
      minute,
      homeOrAway,
      domainAway: domain.away,
      domainHome: domain.home,
      narration: getNarrationDefenseGoalkeeper(),
      id: 0,
      stats: { ...emptyStats, shotsOnGoal: 1, expectedGoal: expectedGoalKick },
    }

    const momentCornerKick: MomentComplete = {
      minute,
      narration: `É escanteio para o ${nameClub}!`,
      homeOrAway,
      stats: emptyStats,
      domainAway: domain.away,
      domainHome: domain.home,
      id: 0,
    }

    return {
      moments: [momentStart, momentDefenseGoalkeeper, momentCornerKick],
      proxChance: 'CORNER KICK',
    }
  }

  const isMomentHoldGoalkeeper = numberRandom < 80
  if (isMomentHoldGoalkeeper) {
    const momentHoldGoalkeeper = getMomentsDefensePlay({
      minute,
      defense: 'completed',
      domain,
      homeOrAway,
      type: 'HOLD GOALKEEPER',
      stats: { ...emptyStats, shotsOnGoal: 1, expectedGoal: expectedGoalKick },
    })

    return {
      moments: [momentStart, momentHoldGoalkeeper],
      proxChance: 'STANTARD',
    }
  }

  const momentGoal = getMomentGoal({
    minute,
    nameClub,
    homeOrAway,
    expectedGoal: expectedGoalKick,
    domain,
  })

  return {
    moments: [momentStart, momentGoal],
    proxChance: 'STANTARD',
  }
}
