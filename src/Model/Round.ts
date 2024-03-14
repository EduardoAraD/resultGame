import { MatchShort } from './Match'

export type CodRound =
  | 'final'
  | 'third'
  | 'semi'
  | 'quarter'
  | 'round of 16'
  | 'knockout stage'
  | 'stantard'

export interface Round {
  numberRound: number
  cod: CodRound
  matchs: MatchShort[]
}
