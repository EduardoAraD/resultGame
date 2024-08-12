import { MomentComplete } from '../../../Model/Moment'
import { emptyStats } from '../../../Model/Stats'
import { GoalMomentProps } from './getMomentGoal'

export function getMomentGreatGoal({
  minute,
  homeOrAway,
  expectedGoal,
  nameClub,
  domain,
}: GoalMomentProps): MomentComplete {
  const moment: MomentComplete = {
    minute,
    narration: `Goooooooolaço do ${nameClub}.`,
    homeOrAway,
    stats: {
      ...emptyStats,
      goal: 1,
      shotsOnGoal: 1,
      expectedGoal,
    },
    domainAway: domain.away,
    domainHome: domain.home,
    id: 0,
  }

  return moment
}
