import { DomainClube } from "../Model/DomainClube";

interface DomainGame {
  home: DomainClube
  away: DomainClube
}

export function domainGame({ home, away }: DomainGame): DomainGame {
  const homeOverrallReajust = 2*(home.overrall) - 70;
  const awayOverrallReajust = 2*(away.overrall) - 70;

  const over = homeOverrallReajust + awayOverrallReajust;
  const variantDomain = 40;

  const domainHomeInPorcentage = (variantDomain * homeOverrallReajust) / over;
  // const domainAwayInPorcentage = (variantDomain * awayOverrallReajust) / over;
  // console.log('-----------------------')
  // console.log(homeOverrallReajust, awayOverrallReajust);
  // console.log('VAria', variantDomain)
  // console.log('DOMIN', domainHomeInPorcentage);

  const numberRandomInDomain = Math.floor(Math.random() * variantDomain);
  const changeDomainHome = domainHomeInPorcentage - numberRandomInDomain;

  // console.log('NUMBER RANDOM -> ', numberRandomInDomain);
  const finalDomainHome = home.domain + changeDomainHome;
  const finalDomainAway = away.domain - changeDomainHome;

  // console.log(finalDomainHome, finalDomainAway);

  if(finalDomainHome < 20){
    return {
      home: { ...home, domain: 20 },
      away: { ...away, domain: 80 }
    }
  } else if(finalDomainAway < 20){
    return {
      home: { ...home, domain: 80 },
      away: { ...away, domain: 20 }
    }
  }

  return {
    home: { ...home, domain: finalDomainHome },
    away: { ...away, domain: finalDomainAway }
  }
}
