import { MomentComplete } from '../../../Model/Moment'
import { emptyStats } from '../../../Model/Stats'
import { ChanceGoalMomentProps, ChanceGoalMomentReturn } from '../interfaces'
import { getDeepPass } from './getDeepPass'
import { getPassForwardPlay } from './getPassForward'

export function getCentralPlay({
  minute,
  nameClub,
  homeOrAway,
  domain,
}: ChanceGoalMomentProps): ChanceGoalMomentReturn {
  const momentStart: MomentComplete = {
    minute,
    narration: 'Vem chegando pelo meio.',
    homeOrAway,
    stats: emptyStats,
    domainAway: domain.away,
    domainHome: domain.home,
    id: 0,
  }

  const numberRandom = Math.floor(Math.random() * 100)

  const isDeepPassPlay = numberRandom < 30
  if (isDeepPassPlay) {
    const { moments, proxChance } = getDeepPass({
      minute,
      homeOrAway,
      domain,
      nameClub,
    })

    return {
      moments: [momentStart, ...moments],
      proxChance,
    }
  }

  const { moments, proxChance } = getPassForwardPlay({
    minute,
    homeOrAway,
    domain,
    nameClub,
  })

  return {
    moments: [momentStart, ...moments],
    proxChance,
  }
}
