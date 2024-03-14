export interface Stats {
  goal: number
  goalPenalty: number
  possession: number
  shotsOnGoal: number
  shotsBlocked: number
  shotsOut: number
  expectedGoal: number
  numberPenalties: number
}

export const emptyStats: Stats = {
  goal: 0,
  goalPenalty: 0,
  possession: 0,
  shotsBlocked: 0,
  shotsOnGoal: 0,
  shotsOut: 0,
  expectedGoal: 0,
  numberPenalties: 0,
}
