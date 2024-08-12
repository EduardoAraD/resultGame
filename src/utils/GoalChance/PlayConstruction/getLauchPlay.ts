import { ChanceGoalMomentProps, ChanceGoalMomentReturn } from '../interfaces'
import { getDeepLauchSide } from './getDeepLauchSide'
import { getDeepLaunchCentral } from './getDeepLaunchCentral'

export function getLaunchPlay({
  minute,
  domain,
  nameClub,
  homeOrAway,
}: ChanceGoalMomentProps): ChanceGoalMomentReturn {
  const numberRandom = Math.floor(Math.random() * 100)

  const isDeepLauchCentral = numberRandom < 50
  if (isDeepLauchCentral) {
    const { moments, proxChance } = getDeepLaunchCentral({
      minute,
      domain,
      nameClub,
      homeOrAway,
    })

    return {
      moments,
      proxChance,
    }
  }

  const { moments, proxChance } = getDeepLauchSide({
    minute,
    domain,
    nameClub,
    homeOrAway,
  })

  return {
    moments,
    proxChance,
  }
}
