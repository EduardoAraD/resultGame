import { DomainClube } from '../Model/DomainClub'

interface DomainGame {
  home: DomainClube
  away: DomainClube
}

export function getDomainMatch({ home, away }: DomainGame): DomainGame {
  const sumOverrallClubs = home.overrall + away.overrall
  const VARIANT_DOMAIN_MAX = 50

  const domainHomeInPorcentage =
    (VARIANT_DOMAIN_MAX * home.overrall) / sumOverrallClubs

  const numberRandomInVariantDomain = Math.floor(
    Math.random() * VARIANT_DOMAIN_MAX,
  )
  const newDomainClub = domainHomeInPorcentage - numberRandomInVariantDomain

  const newDomainClubHome = home.domain + newDomainClub
  const newDomainClubAway = away.domain - newDomainClub

  if (newDomainClubHome < 15) {
    return {
      home: { ...home, domain: 15 },
      away: { ...away, domain: 85 },
    }
  }

  if (newDomainClubAway < 15) {
    return {
      home: { ...home, domain: 85 },
      away: { ...away, domain: 15 },
    }
  }

  return {
    home: { ...home, domain: newDomainClubHome },
    away: { ...away, domain: newDomainClubAway },
  }
}
