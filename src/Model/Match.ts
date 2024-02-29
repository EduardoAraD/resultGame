import { ClubShort } from './Club'
import { ModeMatch } from './ModeMatch'
import { Stats, emptyStats } from './Stats'

export interface Match {
  homeIdClub: string
  awayIdClub: string
  idStats: string
  idStatsTrip: string | undefined // jogo de volta
  numberMatch: number
}

export interface MatchStats {
  id: string
  goalHome: number
  goalAway: number
  goalHomePenal: number
  goalAwayPenal: number
  type: ModeMatch
  status: 'start' | 'finished'
  homeStats: Stats
  awayStats: Stats
}

export interface MatchComplete {
  home: ClubShort
  away: ClubShort
  stats: MatchStats
  statsTrip?: MatchStats
}

export const emptyMatchStats: MatchStats = {
  id: '',
  goalHome: 0,
  goalAway: 0,
  goalAwayPenal: 0,
  goalHomePenal: 0,
  type: 'Normal',
  status: 'start',
  homeStats: emptyStats,
  awayStats: emptyStats,
}
