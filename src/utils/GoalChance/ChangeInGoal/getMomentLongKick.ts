import { MomentComplete } from '../../../Model/Moment'
import { emptyStats } from '../../../Model/Stats'
import { getMomentsDefensePlay } from '../FinishedMoments/getMomentDefense'
import { getMomentGreatGoal } from '../FinishedMoments/getMomentGreatGoal'
import { ChanceGoalMomentProps, ChanceGoalMomentReturn } from '../interfaces'

export function getMomentLongKick({
  minute,
  nameClub,
  homeOrAway,
  domain,
}: ChanceGoalMomentProps): ChanceGoalMomentReturn {
  const momentStart: MomentComplete = {
    minute,
    narration: `O ${nameClub} vai arriscar de longe.`,
    homeOrAway,
    stats: emptyStats,
    domainAway: domain.away,
    domainHome: domain.home,
    id: 0,
  }

  const numberRandom = Math.floor(Math.random() * 100)
  const expectedGoalLongKick = 0.2 // 0.1

  const isMomentGreatGoal = numberRandom < 10
  if (isMomentGreatGoal) {
    const momentGreatGoal = getMomentGreatGoal({
      minute,
      nameClub,
      expectedGoal: expectedGoalLongKick,
      homeOrAway,
      domain,
    })

    return {
      moments: [momentStart, momentGreatGoal],
      proxChance: 'STANTARD',
    }
  }

  const isMomentKickBlocked = numberRandom < 20
  if (isMomentKickBlocked) {
    const momentsKickOut = getMomentsDefensePlay({
      minute,
      domain,
      defense: 'partial',
      homeOrAway,
      type: 'KICK BLOCKED',
      stats: {
        ...emptyStats,
        shotsBlocked: 1,
        expectedGoal: expectedGoalLongKick,
      },
    })

    return {
      moments: [momentStart, momentsKickOut],
      proxChance: 'STANTARD',
    }
  }

  const isMomentHoldGoalkeeper = numberRandom < 40
  if (isMomentHoldGoalkeeper) {
    const momentHoldGoalkeeper = getMomentsDefensePlay({
      minute,
      defense: 'completed',
      domain,
      homeOrAway,
      type: 'HOLD GOALKEEPER',
      stats: {
        ...emptyStats,
        shotsOnGoal: 1,
        expectedGoal: expectedGoalLongKick,
      },
    })

    return {
      moments: [momentStart, momentHoldGoalkeeper],
      proxChance: 'STANTARD',
    }
  }

  const momentKickOut = getMomentsDefensePlay({
    minute,
    defense: 'completed',
    domain,
    homeOrAway,
    type: 'KICK OUT',
    stats: {
      ...emptyStats,
      shotsOut: 1,
      expectedGoal: expectedGoalLongKick,
    },
  })

  return {
    moments: [momentStart, momentKickOut],
    proxChance: 'STANTARD',
  }
}
