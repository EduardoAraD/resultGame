import { ClubShort } from './Club'

export interface ItemClassification {
  club: ClubShort
  points: number
  win: number
  games: number
  goalsScored: number
  goalsConceded: number
}

export type TypeItemClassification = 'Normal' | 'Promotion' | 'Relegation'
