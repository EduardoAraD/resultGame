import { DomainClube } from '../Model/DomainClub'

interface DomainGame {
  home: DomainClube
  away: DomainClube
}

export function domainGame({ home, away }: DomainGame): DomainGame {
  const homeOverrallReajust = home.overrall
  const awayOverrallReajust = away.overrall

  const over = homeOverrallReajust + awayOverrallReajust
  const variantDomain = 50

  const domainHomeInPorcentage = (variantDomain * homeOverrallReajust) / over

  const numberRandomInDomain = Math.floor(Math.random() * variantDomain)
  const changeDomainHome = domainHomeInPorcentage - numberRandomInDomain

  const finalDomainHome = home.domain + changeDomainHome
  const finalDomainAway = away.domain - changeDomainHome

  if (finalDomainHome < 15) {
    return {
      home: { ...home, domain: 15 },
      away: { ...away, domain: 85 },
    }
  } else if (finalDomainAway < 15) {
    return {
      home: { ...home, domain: 85 },
      away: { ...away, domain: 15 },
    }
  }

  return {
    home: { ...home, domain: finalDomainHome },
    away: { ...away, domain: finalDomainAway },
  }
}
