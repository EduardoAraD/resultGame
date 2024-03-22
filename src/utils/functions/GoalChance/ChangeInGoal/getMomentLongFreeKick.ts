import { MomentComplete } from '../../../../Model/Moment'
import { emptyStats } from '../../../../Model/Stats'
import { getMomentsDefensePlay } from '../FinishedMoments/getMomentDefense'
import { getMomentGreatGoal } from '../FinishedMoments/getMomentGreatGoal'
import { ChanceGoalMomentProps, ChanceGoalMomentReturn } from '../interfaces'
import { getMomentLongCross } from './getMomentLongCross'

export function getMomentLongFreeKick({
  minute,
  nameClub,
  homeOrAway,
  domain,
}: ChanceGoalMomentProps): ChanceGoalMomentReturn {
  const momentStart: MomentComplete = {
    minute,
    homeOrAway,
    narration: `O ${nameClub} se prepara para bater a falta de longa distância`,
    stats: emptyStats,
    domainAway: domain.away,
    domainHome: domain.home,
    id: 0,
  }

  const momentBeforeKick: MomentComplete = {
    minute,
    homeOrAway,
    narration: `O jogador vai bater direto.`,
    stats: emptyStats,
    domainAway: domain.away,
    domainHome: domain.home,
    id: 0,
  }

  const numberRandom = Math.floor(Math.random() * 100)

  const isMomentHoldGoalkeeper = numberRandom < 5
  const expectedGoalLongFreeKick = 0.1
  if (isMomentHoldGoalkeeper) {
    const momentDefensePlay = getMomentsDefensePlay({
      minute,
      homeOrAway,
      defense: 'completed',
      domain,
      type: 'HOLD GOALKEEPER',
      stats: {
        ...emptyStats,
        shotsOnGoal: 1,
        expectedGoal: expectedGoalLongFreeKick,
      },
    })

    return {
      moments: [momentStart, momentBeforeKick, momentDefensePlay],
      proxChance: 'STANTARD',
    }
  }

  const isMomentGreatGoal = numberRandom < 10
  if (isMomentGreatGoal) {
    const momentGreatGoal = getMomentGreatGoal({
      minute,
      nameClub,
      homeOrAway,
      domain,
      expectedGoal: expectedGoalLongFreeKick,
    })

    return {
      moments: [momentStart, momentBeforeKick, momentGreatGoal],
      proxChance: 'STANTARD',
    }
  }

  const isMomentShotsOut = numberRandom < 40
  if (isMomentShotsOut) {
    const momentDefensePlay = getMomentsDefensePlay({
      minute,
      defense: 'completed',
      domain,
      homeOrAway,
      type: 'KICK OUT',
      stats: {
        ...emptyStats,
        shotsOut: 1,
        expectedGoal: expectedGoalLongFreeKick,
      },
    })
    return {
      moments: [momentStart, momentBeforeKick, momentDefensePlay],
      proxChance: 'STANTARD',
    }
  }

  const momentBeforeLongCross: MomentComplete = {
    minute,
    homeOrAway,
    narration: 'O jogador vai mandar a bola na área.',
    stats: emptyStats,
    domainAway: domain.away,
    domainHome: domain.home,
    id: 0,
  }

  const { moments, proxChance } = getMomentLongCross({
    minute,
    domain,
    homeOrAway,
    nameClub,
  })

  return {
    moments: [momentStart, momentBeforeLongCross, ...moments],
    proxChance,
  }
}
