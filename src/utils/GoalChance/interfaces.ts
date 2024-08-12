import { MomentComplete } from '../../Model/Moment'

export type ProxChanceClub =
  | 'SHORT FREE'
  | 'LONG FREE'
  | 'CORNER KICK'
  | 'PENALTY'
  | 'STANTARD'

export interface ChanceGoalMomentProps {
  minute: number
  homeOrAway: 'home' | 'away'
  nameClub: string
  domain: {
    home: number
    away: number
  }
  proxMoment?: ProxChanceClub
}

export interface ChanceGoalMomentDualClubsProps {
  minute: number
  homeOrAway: 'home' | 'away'
  nameClubAttack: string
  nameClubDefense: string
  domain: {
    home: number
    away: number
  }
  proxMoment?: ProxChanceClub
}

export interface ChanceGoalMomentReturn {
  moments: MomentComplete[]
  proxChance: ProxChanceClub
}
