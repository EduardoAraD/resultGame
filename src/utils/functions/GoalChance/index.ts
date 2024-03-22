import { MomentComplete } from '../../../Model/Moment'
import { emptyStats } from '../../../Model/Stats'
import { getMomentLongFreeKick } from './ChangeInGoal/getMomentLongFreeKick'
import { getMomentPenaltKick } from './ChangeInGoal/getMomentPenalty'
import { getMomentShortFreeKick } from './ChangeInGoal/getMomentShortFreeKick'
import { getBallPossetionPlay } from './PlayConstruction/getBallPossetionPlay'
import { getCornerKickPlay } from './PlayConstruction/getCornerKickPlay'
import { getLaunchPlay } from './PlayConstruction/getLauchPlay'
import { ChanceGoalMomentProps, ChanceGoalMomentReturn } from './interfaces'

export function getChanceGoal({
  minute,
  domain,
  nameClub,
  homeOrAway,
  proxMoment = 'STANTARD',
}: ChanceGoalMomentProps): ChanceGoalMomentReturn {
  switch (proxMoment) {
    case 'CORNER KICK':
      return getCornerKickPlay({
        minute,
        domain,
        homeOrAway,
        nameClub,
      })
    case 'LONG FREE': {
      return getMomentLongFreeKick({
        minute,
        domain,
        homeOrAway,
        nameClub,
      })
    }
    case 'SHORT FREE':
      return getMomentShortFreeKick({
        minute,
        domain,
        homeOrAway,
        nameClub,
      })
    case 'PENALTY':
      return getMomentPenaltKick({
        minute,
        domain,
        homeOrAway,
        nameClub,
      })
    case 'STANTARD': {
      const momentStart: MomentComplete = {
        minute,
        narration: `O ${nameClub} tem a posse de bola.`,
        homeOrAway,
        stats: emptyStats,
        domainAway: domain.away,
        domainHome: domain.home,
        id: 0,
      }

      const numberRandom = Math.floor(Math.random() * 100)
      const isLaunchPlay = numberRandom <= 30
      if (isLaunchPlay) {
        const { moments, proxChance } = getLaunchPlay({
          minute,
          domain,
          homeOrAway,
          nameClub,
        })

        return {
          moments: [momentStart, ...moments],
          proxChance,
        }
      }

      const { moments, proxChance } = getBallPossetionPlay({
        minute,
        domain,
        homeOrAway,
        nameClub,
      })

      return {
        moments: [momentStart, ...moments],
        proxChance,
      }
    }
  }
}
