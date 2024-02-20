import { Stats, emptyStats } from '../../../Model/Stats'
import {
  narrationBallGoalkeeper,
  narrationDefenseGoalkeeper,
  narrationDefenseTakeAwayBall,
  narrationHoldGoalkeeper,
  narrationKickBlocked,
  narrationKickOut,
  narrationWrongPass,
} from './finished'
import { ChanceGoalMomentReturn } from './interfaces'

type NarrationType =
  | 'GOALKEEPER'
  | 'DEFENSE'
  | 'WRONG PASS'
  | 'HOLD GOALKEEPER'
  | 'KICK OUT'
  | 'KICK BLOCKED'
  | 'DEFENSE GOALKEEPER'

interface DefenseProps {
  minute: number
  domain: {
    home: number
    away: number
  }
  homeOrAway: 'home' | 'away'
  type: NarrationType
  stats?: Stats
}

function getNarration(type: NarrationType): string {
  switch (type) {
    case 'GOALKEEPER':
      return narrationBallGoalkeeper()
    case 'DEFENSE':
      return narrationDefenseTakeAwayBall()
    case 'WRONG PASS':
      return narrationWrongPass()
    case 'HOLD GOALKEEPER':
      return narrationHoldGoalkeeper()
    case 'KICK OUT':
      return narrationKickOut()
    case 'KICK BLOCKED':
      return narrationKickBlocked()
    case 'DEFENSE GOALKEEPER':
      return narrationDefenseGoalkeeper()
  }
}

export function defenseParcial({
  minute,
  type,
  homeOrAway,
  domain,
  stats = emptyStats,
}: DefenseProps) {
  const domainHome = domain.home + (homeOrAway === 'home' ? -5 : 5)
  const domainAway = domain.away + (homeOrAway === 'home' ? 5 : -5)
  const moment: ChanceGoalMomentReturn = {
    moments: [
      {
        minute,
        narracao: getNarration(type),
        homeOrAway,
        stats,
        domainAway,
        domainHome,
        id: 0,
      },
    ],
    proxChance: 'NORMAL',
  }

  return moment
}

export function defenseChangePosse({
  minute,
  type,
  homeOrAway,
  domain,
  stats = emptyStats,
}: DefenseProps) {
  const domainHome = domain.home + (homeOrAway === 'home' ? -15 : 15)
  const domainAway = domain.away + (homeOrAway === 'home' ? 15 : -15)
  const moment: ChanceGoalMomentReturn = {
    moments: [
      {
        minute,
        narracao: getNarration(type),
        homeOrAway,
        stats,
        domainAway,
        domainHome,
        id: 0,
      },
    ],
    proxChance: 'NORMAL',
  }

  return moment
}
