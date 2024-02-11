import { ClubShort } from './Club'
import { ModeMatch } from './ModeMatch'

export interface Match {
  homeIdClub: string
  awayIdClub: string
  idStats: string
}

export interface MatchStats {
  id: string
  goalHome: number
  goalAway: number
  goalHomePenal: number
  goalAwayPenal: number
  type: ModeMatch
  status: 'start' | 'finished'
}

export interface MatchComplete extends MatchStats {
  home: ClubShort
  away: ClubShort
}

export interface Round {
  numberRound: number
  matchs: Match[]
}

export const emptyMatchStats: MatchStats = {
  id: '',
  goalHome: 0,
  goalAway: 0,
  goalAwayPenal: 0,
  goalHomePenal: 0,
  type: 'Normal',
  status: 'start',
}
