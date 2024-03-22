import { MomentComplete } from '../../../../Model/Moment'
import { emptyStats } from '../../../../Model/Stats'
import { getMomentsDefensePlay } from '../FinishedMoments/getMomentDefense'
import { getMomentGoal } from '../FinishedMoments/getMomentGoal'
import { ChanceGoalMomentProps, ChanceGoalMomentReturn } from '../interfaces'
import { getMomentReboundKick } from './getMomentReboudKick'

export function getMomentPenaltKick({
  minute,
  nameClub,
  homeOrAway,
  domain,
}: ChanceGoalMomentProps): ChanceGoalMomentReturn {
  const momentStart: MomentComplete = {
    minute,
    narration: 'O jogador se prepara para cobrar o penalti.',
    homeOrAway,
    stats: emptyStats,
    domainAway: domain.away,
    domainHome: domain.home,
    id: 0,
  }

  const numberRandom = Math.floor(Math.random() * 100)
  const expectedGoalPenaltyKick = 0.8

  const isMomentRoboundKick = numberRandom < 10
  if (isMomentRoboundKick) {
    const momentGoalkeeperPalm: MomentComplete = {
      minute,
      narration: 'O goleiro espalma para o meio da área',
      homeOrAway,
      stats: {
        ...emptyStats,
        shotsOnGoal: 1,
        expectedGoal: expectedGoalPenaltyKick,
      },
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

  const isMomentKickOut = numberRandom < 20
  if (isMomentKickOut) {
    const momentDefensePlay = getMomentsDefensePlay({
      minute,
      defense: 'completed',
      homeOrAway,
      domain,
      type: 'KICK OUT',
      stats: {
        ...emptyStats,
        shotsOut: 1,
        expectedGoal: expectedGoalPenaltyKick,
      },
    })

    return {
      moments: [momentStart, momentDefensePlay],
      proxChance: 'STANTARD',
    }
  }

  const isMomentDefenseGoalkeeper = numberRandom < 30
  if (isMomentDefenseGoalkeeper) {
    const momentDefensePlay = getMomentsDefensePlay({
      minute,
      defense: 'completed',
      domain,
      homeOrAway,
      type: 'DEFENSE GOALKEEPER',
      stats: {
        ...emptyStats,
        shotsOnGoal: 1,
        expectedGoal: expectedGoalPenaltyKick,
      },
    })

    return {
      moments: [momentStart, momentDefensePlay],
      proxChance: 'STANTARD',
    }
  }

  const momentGoal = getMomentGoal({
    minute,
    nameClub,
    homeOrAway,
    expectedGoal: expectedGoalPenaltyKick,
    domain,
  })

  return {
    moments: [momentStart, momentGoal],
    proxChance: 'STANTARD',
  }
}
