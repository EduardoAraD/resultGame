export type TypeCup = 'league' | 'cup'
export type StatusCup = 'start' | 'progress' | 'closed'

export interface CupShort {
  id: string
  name: string
  numberClubs: number
  type: TypeCup
  status: StatusCup
}

export interface CupComplete extends CupShort {
  isRoundTrip: boolean // é ida e volta?
  // hasAwayGoal: boolean // gol fora
  hasThirdPlace: boolean
  pointsForWin: number
  pointsForDraw: number
  pointsForLoss: number
  numberClubsPromoted: number
  numberClubsRelegated: number
  idsClubsParticipating: string[]
}

export const emptyCupComplete: CupComplete = {
  name: '',
  numberClubs: 0,
  type: 'league',
  status: 'start',
  id: '',
  isRoundTrip: false,
  // hasAwayGoal: false,
  hasThirdPlace: false,
  pointsForWin: 0,
  pointsForDraw: 0,
  pointsForLoss: 0,
  numberClubsPromoted: 0,
  numberClubsRelegated: 0,
  idsClubsParticipating: [],
}
