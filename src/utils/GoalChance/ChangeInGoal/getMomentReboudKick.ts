import { MomentComplete } from '../../../Model/Moment'
import { emptyStats } from '../../../Model/Stats'
import { getMomentsDefensePlay } from '../FinishedMoments/getMomentDefense'
import { getMomentGoal } from '../FinishedMoments/getMomentGoal'
import { ChanceGoalMomentProps, ChanceGoalMomentReturn } from '../interfaces'

export function getMomentReboundKick({
  minute,
  nameClub,
  homeOrAway,
  domain,
}: ChanceGoalMomentProps): ChanceGoalMomentReturn {
  const moments: MomentComplete[] = []

  const moment: MomentComplete = {
    minute,
    narration: 'A bola sobra para o atacante.',
    homeOrAway,
    stats: emptyStats,
    domainAway: domain.away,
    domainHome: domain.home,
    id: 0,
  }
  moments.push(moment)

  const numberRandom = Math.floor(Math.random() * 100)
  const expectedGoalInReboundKick = 0.8

  const isMomentKickOut = numberRandom < 10
  if (isMomentKickOut) {
    const momentKickOut = getMomentsDefensePlay({
      minute,
      domain,
      defense: 'completed',
      type: 'KICK OUT',
      stats: {
        ...emptyStats,
        shotsOut: 1,
        expectedGoal: expectedGoalInReboundKick,
      },
      homeOrAway,
    })

    moments.push(momentKickOut)

    return {
      moments,
      proxChance: 'STANTARD',
    }
  }

  const isMomentKickBlocked = numberRandom < 20
  if (isMomentKickBlocked) {
    const momentKickBlocked = getMomentsDefensePlay({
      minute,
      domain,
      defense: 'partial',
      type: 'KICK BLOCKED',
      stats: {
        ...emptyStats,
        shotsBlocked: 1,
        expectedGoal: expectedGoalInReboundKick,
      },
      homeOrAway,
    })
    moments.push(momentKickBlocked)

    return {
      moments,
      proxChance: 'STANTARD',
    }
  }

  const isMomentHoldGoalkeeper = numberRandom < 30
  if (isMomentHoldGoalkeeper) {
    const momentHoldGoalkeeper = getMomentsDefensePlay({
      minute,
      domain,
      defense: 'completed',
      type: 'HOLD GOALKEEPER',
      stats: {
        ...emptyStats,
        shotsOnGoal: 1,
        expectedGoal: expectedGoalInReboundKick,
      },
      homeOrAway,
    })
    moments.push(momentHoldGoalkeeper)

    return {
      moments,
      proxChance: 'STANTARD',
    }
  }

  const momentGoal = getMomentGoal({
    minute,
    nameClub,
    homeOrAway,
    expectedGoal: expectedGoalInReboundKick,
    domain,
  })
  moments.push(momentGoal)

  return {
    moments,
    proxChance: 'STANTARD',
  }
}
