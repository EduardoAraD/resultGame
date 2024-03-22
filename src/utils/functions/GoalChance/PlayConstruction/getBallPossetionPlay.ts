import { ChanceGoalMomentProps, ChanceGoalMomentReturn } from '../interfaces'
import { getCentralPlay } from './getCentralPlay'
import { getSidePlay } from './getSidePlay'

export function getBallPossetionPlay({
  minute,
  domain,
  nameClub,
  homeOrAway,
}: ChanceGoalMomentProps): ChanceGoalMomentReturn {
  const numberRandom = Math.floor(Math.random() * 100)

  const isSidePlay = numberRandom < 50
  if (isSidePlay) {
    const { moments, proxChance } = getSidePlay({
      minute,
      domain,
      homeOrAway,
      nameClub,
    })

    return {
      moments,
      proxChance,
    }
  }

  const { moments, proxChance } = getCentralPlay({
    minute,
    domain,
    homeOrAway,
    nameClub,
  })

  return {
    moments,
    proxChance,
  }
}
