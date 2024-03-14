import { Stats } from './Stats'

export interface Moment {
  minute: number
  narration: string
  isGoal?: boolean
  isGoalPenalty?: boolean
  homeOrAway: 'home' | 'away' | 'game'
  stats: Stats
}

export interface MomentComplete extends Moment {
  domainHome: number
  domainAway: number
  id: number
}
