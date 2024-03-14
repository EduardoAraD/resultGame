import { ClubShort } from './Club'

export type TypeItemClassification = 'standard' | 'promotion' | 'relegation'

export interface ItemClassification {
  club: ClubShort
  points: number
  win: number
  games: number
  goalsScored: number
  goalsConceded: number
  type: TypeItemClassification
}
