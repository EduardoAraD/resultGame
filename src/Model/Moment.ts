import { Stats } from './Stats'

export interface Moment {
  minute: number
  narracao: string
  goal?: boolean
  penalt?: boolean
  homeOrAway: 'home' | 'away' | 'game'
  stats: Stats
}

export interface MomentComplete extends Moment {
  domainHome: number
  domainAway: number
  id: number
}
