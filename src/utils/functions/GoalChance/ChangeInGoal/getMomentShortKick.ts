import { MomentComplete } from '../../../../Model/Moment'
import { emptyStats } from '../../../../Model/Stats'
import { getMomentsDefensePlay } from '../FinishedMoments/getMomentDefense'
import { getMomentGoal } from '../FinishedMoments/getMomentGoal'
import {
  ChanceGoalMomentProps,
  ChanceGoalMomentReturn,
  ProxChanceClub,
} from '../interfaces'

export function getMomentShortKick({
  minute,
  nameClub,
  homeOrAway,
  domain,
}: ChanceGoalMomentProps): ChanceGoalMomentReturn {
  const moments: MomentComplete[] = []
  let proxChance: ProxChanceClub = 'STANTARD'

  const momentStart: MomentComplete = {
    minute,
    narration: 'O jogador está na cara do gol, pronto para marcar!',
    homeOrAway,
    stats: emptyStats,
    domainAway: domain.away,
    domainHome: domain.home,
    id: 0,
  }
  moments.push(momentStart)

  const numberRandom = Math.floor(Math.random() * 100)
  const expectedGoalInShortKick = 0.5 // 0.40

  if (numberRandom < 40) {
    const momentGoal = getMomentGoal({
      minute,
      nameClub,
      homeOrAway,
      expectedGoal: expectedGoalInShortKick,
      domain,
    })
    moments.push(momentGoal)
  } else if (numberRandom < 60) {
    const momentPenalty: MomentComplete = {
      minute,
      narration: 'Penalti! O jogador foi derrubado na hora do chute',
      homeOrAway,
      stats: emptyStats,
      domainAway: domain.away,
      domainHome: domain.home,
      id: 0,
    }
    moments.push(momentPenalty)
    proxChance = 'PENALTY'
  } else if (numberRandom < 85) {
    const momentDefensePlay = getMomentsDefensePlay({
      minute,
      defense: 'completed',
      domain,
      homeOrAway,
      type: 'DEFENSE GOALKEEPER',
      stats: {
        ...emptyStats,
        shotsOnGoal: 1,
        expectedGoal: expectedGoalInShortKick,
      },
    })
    moments.push(momentDefensePlay)

    const momentCorner: MomentComplete = {
      minute,
      narration: `É escanteio para o ${nameClub}!`,
      homeOrAway,
      stats: emptyStats,
      domainAway: domain.away,
      domainHome: domain.home,
      id: 0,
    }
    moments.push(momentCorner)
    proxChance = 'CORNER KICK'
  } else {
    const momentKickOut = getMomentsDefensePlay({
      minute,
      domain,
      homeOrAway,
      type: 'KICK OUT',
      defense: 'completed',
      stats: {
        ...emptyStats,
        shotsOut: 1,
        expectedGoal: expectedGoalInShortKick,
      },
    })
    moments.push(momentKickOut)
  }

  const moment: ChanceGoalMomentReturn = {
    moments,
    proxChance,
  }

  return moment
}
