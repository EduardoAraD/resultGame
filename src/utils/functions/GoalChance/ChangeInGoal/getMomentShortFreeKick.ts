import { MomentComplete } from '../../../../Model/Moment'
import { emptyStats } from '../../../../Model/Stats'
import { getMomentsDefensePlay } from '../FinishedMoments/getMomentDefense'
import { getMomentGoal } from '../FinishedMoments/getMomentGoal'
import { getNarration } from '../NarrationMoments/getNarration'
import { ChanceGoalMomentProps, ChanceGoalMomentReturn } from '../interfaces'

export function getMomentShortFreeKick({
  minute,
  nameClub,
  homeOrAway,
  domain,
}: ChanceGoalMomentProps): ChanceGoalMomentReturn {
  const momentStart: MomentComplete = {
    minute,
    homeOrAway,
    narration: `O ${nameClub} se prepara para bater a falta próximo a grande área.`,
    stats: emptyStats,
    domainAway: domain.away,
    domainHome: domain.home,
    id: 0,
  }

  const numberRandom = Math.floor(Math.random() * 100)
  const expectedGoalShortFree = 0.3

  const momentPassBarrier: MomentComplete = {
    minute,
    homeOrAway,
    narration: 'A bola passa pela barreira.',
    stats: emptyStats,
    domainAway: domain.away,
    domainHome: domain.home,
    id: 0,
  }

  const isMomentBarrier = numberRandom > 85
  if (isMomentBarrier) {
    const momentDefensePlay = getMomentsDefensePlay({
      minute,
      homeOrAway,
      defense: 'partial',
      domain,
      type: 'BARRIER',
      stats: {
        ...emptyStats,
        shotsBlocked: 1,
        expectedGoal: expectedGoalShortFree,
      },
    })

    return {
      moments: [momentStart, momentDefensePlay],
      proxChance: 'STANTARD',
    }
  }

  const isMomentBarrierCornerKick = numberRandom >= 70
  if (isMomentBarrierCornerKick) {
    const momentBarrierToCorner: MomentComplete = {
      minute,
      homeOrAway,
      narration: 'Bate na barreira e sai para linha de fundo',
      stats: {
        ...emptyStats,
        shotsBlocked: 1,
        expectedGoal: expectedGoalShortFree,
      },
      domainAway: domain.away,
      domainHome: domain.home,
      id: 0,
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
      moments: [momentStart, momentBarrierToCorner, momentCornerKick],
      proxChance: 'CORNER KICK',
    }
  }

  const isMomentKickOut = numberRandom >= 40
  if (isMomentKickOut) {
    const momentKickOut = getMomentsDefensePlay({
      minute,
      defense: 'completed',
      type: 'KICK OUT',
      stats: {
        ...emptyStats,
        shotsOut: 1,
        expectedGoal: expectedGoalShortFree,
      },
      domain,
      homeOrAway,
    })

    return {
      moments: [momentStart, momentPassBarrier, momentKickOut],
      proxChance: 'STANTARD',
    }
  }

  const isMomentDefenseGoalkeeper = numberRandom >= 20
  if (isMomentDefenseGoalkeeper) {
    const momentDefenseGoalkeeper: MomentComplete = {
      minute,
      domainAway: domain.away,
      domainHome: domain.home,
      homeOrAway,
      id: 0,
      narration: getNarration({ type: 'DEFENSE GOALKEEPER' }),
      stats: {
        ...emptyStats,
        shotsOnGoal: 1,
        expectedGoal: expectedGoalShortFree,
      },
    }

    const momentCorner: MomentComplete = {
      minute,
      narration: `É escanteio para o ${nameClub}!`,
      homeOrAway,
      stats: emptyStats,
      domainAway: domain.away,
      domainHome: domain.home,
      id: 0,
    }

    return {
      moments: [
        momentStart,
        momentPassBarrier,
        momentDefenseGoalkeeper,
        momentCorner,
      ],
      proxChance: 'CORNER KICK',
    }
  }

  const momentGoal = getMomentGoal({
    minute,
    domain,
    homeOrAway,
    expectedGoal: expectedGoalShortFree,
    nameClub,
  })

  return {
    moments: [momentStart, momentPassBarrier, momentGoal],
    proxChance: 'STANTARD',
  }
}
