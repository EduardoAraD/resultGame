import { MomentComplete } from '../../../Model/Moment'
import { emptyStats } from '../../../Model/Stats'
import { getMomentsDefensePlay } from '../FinishedMoments/getMomentDefense'
import { getMomentGoal } from '../FinishedMoments/getMomentGoal'
import { ChanceGoalMomentReturn, ProxChanceClub } from '../interfaces'

interface GetMomentHeadKickProps {
  minute: number
  homeOrAway: 'home' | 'away'
  nameClub: string
  domain: {
    home: number
    away: number
  }
}

interface GetMomentHeadKickReturn {
  moments: MomentComplete[]
  proxChance: ProxChanceClub
}

export function getMomentHeadKick({
  minute,
  nameClub,
  homeOrAway,
  domain,
}: GetMomentHeadKickProps): GetMomentHeadKickReturn {
  const moments: MomentComplete[] = []
  const proxChance: ProxChanceClub = 'STANTARD'

  const momentStart: MomentComplete = {
    minute,
    narration: 'O atacante faz a cabeçada!',
    homeOrAway,
    stats: emptyStats,
    domainAway: domain.away,
    domainHome: domain.home,
    id: 0,
  }
  moments.push(momentStart)

  const expectedGoalInHeadKick = 0.3 // 0.2
  const numberRandom = Math.floor(Math.random() * 100)

  if (numberRandom < 25) {
    const momentDefensePlay = getMomentsDefensePlay({
      minute,
      domain,
      defense: 'completed',
      homeOrAway,
      type: 'HOLD GOALKEEPER',
      stats: {
        ...emptyStats,
        shotsOnGoal: 1,
        expectedGoal: expectedGoalInHeadKick,
      },
    })
    moments.push(momentDefensePlay)
  } else if (numberRandom < 45) {
    const momentGoal = getMomentGoal({
      minute,
      nameClub,
      homeOrAway,
      expectedGoal: expectedGoalInHeadKick,
      domain,
    })
    moments.push(momentGoal)
  } else {
    const momentDefensePlay = getMomentsDefensePlay({
      minute,
      defense: 'completed',
      domain,
      homeOrAway,
      type: 'KICK OUT',
      stats: {
        ...emptyStats,
        shotsOut: 1,
        expectedGoal: expectedGoalInHeadKick,
      },
    })
    moments.push(momentDefensePlay)
  }

  const moment: ChanceGoalMomentReturn = {
    moments,
    proxChance,
  }

  return moment
}
