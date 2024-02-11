import { StatusCup } from './Status'

export type TypeCup = 'League' | 'Cup'

export interface CupShort {
  name: string
  numberClubs: number
  type: TypeCup
  status: StatusCup
  id: string
}

export interface CupComplete extends CupShort {
  roundTrip: boolean // ida e volta
  hasAwayGoal: boolean // gol fora
  winPoints: number
  drawPoints: number
  lossPoints: number
  numberClubsPromoted: number
  numberClubsRelegated: number
  idsClubs: string[]
}

export const emptyCupComplete: CupComplete = {
  name: '',
  numberClubs: 0,
  type: 'League',
  status: 'start',
  id: '',
  roundTrip: false,
  hasAwayGoal: false,
  winPoints: 0,
  drawPoints: 0,
  lossPoints: 0,
  numberClubsPromoted: 0,
  numberClubsRelegated: 0,
  idsClubs: [],
}
