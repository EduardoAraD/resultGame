import { MomentComplete } from '../../../Model/Moment'
import { emptyStats } from '../../../Model/Stats'

export interface GoalMomentProps {
  minute: number
  nameClub: string
  homeOrAway: 'home' | 'away'
  expectedGoal: number
  domain: {
    home: number
    away: number
  }
}

export function getMomentGoal({
  minute,
  nameClub,
  homeOrAway,
  domain,
  expectedGoal,
}: GoalMomentProps): MomentComplete {
  const moment: MomentComplete = {
    minute,
    narration: `Gooooooooll do ${nameClub}.`,
    homeOrAway,
    stats: {
      ...emptyStats,
      goal: 1,
      shotsOnGoal: 1,
      expectedGoal,
    },
    domainHome: domain.home,
    domainAway: domain.away,
    id: 0,
  }

  return moment
}
