import { Match } from './Match'

export type CodRound = 'F' | 'T' | 'SF' | 'QF' | 'OF' | string

export interface Round {
  numberRound: number
  cod: CodRound
  matchs: Match[]
}
