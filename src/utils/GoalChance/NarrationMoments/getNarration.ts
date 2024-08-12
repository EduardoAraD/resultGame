import { getNarrationBallGoalkeeper } from './getNarrationBallGoalkeeper'
import { getNarrationBarrier } from './getNarrationBarrier'
import { getNarrationDefenseGoalkeeper } from './getNarrationDefenseGoalkeeper'
import { getNarrationDefenseTakeAwayBall } from './getNarrationDefenseTakeAwayBall'
import { getNarrationHoldGoalkeeper } from './getNarrationHoldGoalkeeper'
import { getNarrationKickBlocked } from './getNarrationKickBlocked'
import { getNarrationKickOut } from './getNarrationKickOut'
import { getNarrationRecoverBall } from './getNarrationRecoverBall'
import { getNarrationStrongLauch } from './getNarrationStrongLauch'
import { getNarrationWrongPass } from './getNarrationWrongPass'
import { getNarrationDefenseIntercepts } from './getNarrationDefenseIntercepts'
import { getNarrationStrongLauchSide } from './getNarrationStrongLauchSide'

export type NarrationType =
  | 'GOALKEEPER'
  | 'DEFENSE'
  | 'WRONG PASS'
  | 'HOLD GOALKEEPER'
  | 'KICK OUT'
  | 'KICK BLOCKED'
  | 'DEFENSE GOALKEEPER'
  | 'BARRIER'
  | 'RECOVER BALL'
  | 'STRONG LAUNCH'
  | 'STRONG LAUNCH SIDE'
  | 'DEFENSE INTERCEPTS'

interface GetNarrationProps {
  type: NarrationType
}

export function getNarration({ type }: GetNarrationProps): string {
  switch (type) {
    case 'GOALKEEPER':
      return getNarrationBallGoalkeeper()
    case 'DEFENSE':
      return getNarrationDefenseTakeAwayBall()
    case 'WRONG PASS':
      return getNarrationWrongPass()
    case 'HOLD GOALKEEPER':
      return getNarrationHoldGoalkeeper()
    case 'KICK OUT':
      return getNarrationKickOut()
    case 'KICK BLOCKED':
      return getNarrationKickBlocked()
    case 'DEFENSE GOALKEEPER':
      return getNarrationDefenseGoalkeeper()
    case 'BARRIER':
      return getNarrationBarrier()
    case 'RECOVER BALL':
      return getNarrationRecoverBall()
    case 'STRONG LAUNCH':
      return getNarrationStrongLauch()
    case 'DEFENSE INTERCEPTS':
      return getNarrationDefenseIntercepts()
    case 'STRONG LAUNCH SIDE':
      return getNarrationStrongLauchSide()
  }
}
