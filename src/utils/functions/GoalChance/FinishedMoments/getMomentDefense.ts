import { MomentComplete } from '../../../../Model/Moment'
import { Stats, emptyStats } from '../../../../Model/Stats'
import { NarrationType, getNarration } from '../NarrationMoments/getNarration'

interface GetMomentDefensePlayProps {
  minute: number
  defense: 'partial' | 'completed'
  domain: {
    home: number
    away: number
  }
  homeOrAway: 'home' | 'away'
  type: NarrationType
  stats?: Stats
}

export function getMomentsDefensePlay({
  minute,
  type,
  defense,
  homeOrAway,
  domain,
  stats = emptyStats,
}: GetMomentDefensePlayProps) {
  const domainDefense = defense === 'partial' ? 10 : 30

  const domainHome =
    domain.home + (homeOrAway === 'home' ? -domainDefense : domainDefense)
  const domainAway =
    domain.away + (homeOrAway === 'home' ? domainDefense : -domainDefense)

  const moment: MomentComplete = {
    minute,
    narration: getNarration({ type }),
    homeOrAway,
    stats,
    domainAway,
    domainHome,
    id: 0,
  }

  return moment
}
