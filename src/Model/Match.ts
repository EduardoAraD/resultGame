import { ClubShort } from './Club'
import { Stats, emptyStats } from './Stats'

export type TypeMatch =
  | 'standard'
  | 'knockout stage'
  | 'one-way game'
  | 'return game'

export interface MatchShort {
  homeIdClub: string
  awayIdClub: string
  idStats: string
  idStatsTrip: string | undefined // jogo de volta
  numberMatch: number
}

export interface MatchStats {
  id: string
  type: TypeMatch
  status: 'start' | 'progress' | 'finished'
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
  type: 'standard',
  status: 'start',
  homeStats: emptyStats,
  awayStats: emptyStats,
}
