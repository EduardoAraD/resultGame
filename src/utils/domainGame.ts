import { DomainClube } from '../Model/DomainClub'

interface DomainGame {
  home: DomainClube
  away: DomainClube
}

export function domainGame({ home, away }: DomainGame): DomainGame {
  const homeOverrallReajust = 2 * home.overrall - 50
  const awayOverrallReajust = 2 * away.overrall - 50

  const over = homeOverrallReajust + awayOverrallReajust
  const variantDomain = 50

  const domainHomeInPorcentage = (variantDomain * homeOverrallReajust) / over

  const numberRandomInDomain = Math.floor(Math.random() * variantDomain)
  const changeDomainHome = domainHomeInPorcentage - numberRandomInDomain

  const finalDomainHome = home.domain + changeDomainHome
  const finalDomainAway = away.domain - changeDomainHome

  if (finalDomainHome < 20) {
    return {
      home: { ...home, domain: 20 },
      away: { ...away, domain: 80 },
    }
  } else if (finalDomainAway < 20) {
    return {
      home: { ...home, domain: 80 },
      away: { ...away, domain: 20 },
    }
  }

  return {
    home: { ...home, domain: finalDomainHome },
    away: { ...away, domain: finalDomainAway },
  }
}
