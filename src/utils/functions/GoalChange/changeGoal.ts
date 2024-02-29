import { MomentComplete } from '../../../Model/Moment'
import { emptyStats } from '../../../Model/Stats'

import { defenseChangePosse, defenseParcial } from './defensePlay'
import { goalMoment, golacoMoment } from './finished'
import {
  ChanceGoalMomentProps,
  ChanceGoalMomentReturn,
  ProxChanceClub,
} from './interfaces'

export function getHeadKick({
  minute,
  nameClub,
  homeOrAway,
  domain,
}: ChanceGoalMomentProps): ChanceGoalMomentReturn {
  let moments: MomentComplete[] = []
  let proxChance: ProxChanceClub = 'NORMAL'
  const momentIni: MomentComplete = {
    minute,
    narracao: 'O atacante faz a cabeçada!',
    homeOrAway,
    stats: emptyStats,
    domainAway: domain.away,
    domainHome: domain.home,
    id: 0,
  }
  moments.push(momentIni)
  // 1. CABEÇADA
  //     1.1 FORA 0.5
  //     1.2 DEFESA 0.2
  //     1.3 GOL 0.3
  const chanceGoalKick = 0.3 // 0.2
  const numberRandom = Math.floor(Math.random() * 100)
  if (numberRandom < 25) {
    const responseDefense = defenseChangePosse({
      minute,
      domain,
      homeOrAway,
      type: 'HOLD GOALKEEPER',
      stats: { ...emptyStats, chutesNoAlvo: 1, golEsperado: chanceGoalKick },
    })
    moments = moments.concat(responseDefense.moments)
    proxChance = responseDefense.proxChance
  } else if (numberRandom < 45) {
    const moment = goalMoment(
      minute,
      nameClub,
      homeOrAway,
      chanceGoalKick,
      domain,
    )
    moments.push(moment)
  } else {
    const responseKickOut = defenseChangePosse({
      minute,
      domain,
      homeOrAway,
      type: 'KICK OUT',
      stats: { ...emptyStats, chutesFora: 1, golEsperado: chanceGoalKick },
    })
    moments = moments.concat(responseKickOut.moments)
    proxChance = responseKickOut.proxChance
  }

  const moment: ChanceGoalMomentReturn = {
    moments,
    proxChance,
  }

  return moment
}

export function getShortKick({
  minute,
  nameClub,
  homeOrAway,
  domain,
}: ChanceGoalMomentProps): ChanceGoalMomentReturn {
  let moments: MomentComplete[] = []
  let proxChance: ProxChanceClub = 'NORMAL'
  const momentIni: MomentComplete = {
    minute,
    narracao: 'O jogador está na cara do gol, pronto para marcar!',
    homeOrAway,
    stats: emptyStats,
    domainAway: domain.away,
    domainHome: domain.home,
    id: 0,
  }
  moments.push(momentIni)
  const numberRandom = Math.floor(Math.random() * 100)
  const chanceGoalKick = 0.5 // 0.40
  // 2. CHUTE DE CARA
  //   5.1 GOL 0.6
  //   5.2 DEFESA 0.2
  //   5.4 FORA 0.2
  //   5.5 PENAL 0.1
  if (numberRandom < 40) {
    const moment = goalMoment(
      minute,
      nameClub,
      homeOrAway,
      chanceGoalKick,
      domain,
    )
    moments.push(moment)
  } else if (numberRandom < 60) {
    const moment: MomentComplete = {
      minute,
      narracao: 'Penalti! O jogador foi derrubado na hora do chute',
      homeOrAway,
      stats: emptyStats,
      domainAway: domain.away,
      domainHome: domain.home,
      id: 0,
    }
    moments.push(moment)
    proxChance = 'PENALT'
  } else if (numberRandom < 85) {
    const responseDefense = defenseChangePosse({
      minute,
      domain,
      homeOrAway,
      type: 'DEFENSE GOALKEEPER',
      stats: { ...emptyStats, chutesNoAlvo: 1, golEsperado: chanceGoalKick },
    })
    moments = moments.concat(responseDefense.moments)
    proxChance = responseDefense.proxChance
    const momentCorner: MomentComplete = {
      minute,
      narracao: `É escanteio para o ${nameClub}!`,
      homeOrAway,
      stats: emptyStats,
      domainAway: domain.away,
      domainHome: domain.home,
      id: 0,
    }
    moments.push(momentCorner)
    proxChance = 'CORNER KICK'
  } else {
    const responseKickOut = defenseChangePosse({
      minute,
      domain,
      homeOrAway,
      type: 'KICK OUT',
      stats: { ...emptyStats, chutesFora: 1, golEsperado: chanceGoalKick },
    })
    moments = moments.concat(responseKickOut.moments)
    proxChance = responseKickOut.proxChance
  }

  const moment: ChanceGoalMomentReturn = {
    moments,
    proxChance,
  }

  return moment
}

export function getKick({
  minute,
  nameClub,
  homeOrAway,
  domain,
}: ChanceGoalMomentProps): ChanceGoalMomentReturn {
  let moments: MomentComplete[] = []
  let proxChance: ProxChanceClub = 'NORMAL'
  //   2. CHUTE
  //     2.1 GOL 0.3
  //     2.2 DEFESA 0.3
  //     2.3 FORA 0.1
  //     2.4 BLOUEADO 0.1
  //     2.5 REBOTE 0.1
  //     2.6 FALTA 0.1

  const numberRandom = Math.floor(Math.random() * 100)
  const chanceGoalKick = 0.3 // 0.25
  if (numberRandom < 10) {
    // rebote
    const moment: MomentComplete = {
      minute,
      narracao: 'Espalma o goleiro a bola.',
      homeOrAway,
      stats: { ...emptyStats, chutesNoAlvo: 1, golEsperado: chanceGoalKick },
      domainAway: domain.away,
      domainHome: domain.home,
      id: 0,
    }
    moments.push(moment)
    const responseRebound = getReboundKick({
      minute,
      domain,
      homeOrAway,
      nameClub,
    })
    moments = moments.concat(responseRebound.moments)
    proxChance = responseRebound.proxChance
  } else if (numberRandom < 20) {
    // fora
    const responseKickOut = defenseChangePosse({
      minute,
      domain,
      homeOrAway,
      type: 'KICK OUT',
      stats: { ...emptyStats, chutesFora: 1, golEsperado: chanceGoalKick },
    })
    moments = moments.concat(responseKickOut.moments)
    proxChance = responseKickOut.proxChance
  } else if (numberRandom < 30) {
    // bloquado
    const responseKickOut = defenseParcial({
      minute,
      domain,
      homeOrAway,
      type: 'KICK BLOCKED',
      stats: { ...emptyStats, chutesBloqueado: 1, golEsperado: chanceGoalKick },
    })
    moments = moments.concat(responseKickOut.moments)
    proxChance = responseKickOut.proxChance
  } else if (numberRandom < 45) {
    const moment: MomentComplete = {
      minute,
      narracao: 'Falta marcada! O jogador foi derrubado na hora de chutar',
      homeOrAway,
      stats: emptyStats,
      domainAway: domain.away,
      domainHome: domain.home,
      id: 0,
    }
    moments.push(moment)
    proxChance = 'SHORT FREE'
  } else if (numberRandom < 60) {
    const responseDefense = defenseChangePosse({
      minute,
      domain,
      homeOrAway,
      type: 'DEFENSE GOALKEEPER',
      stats: { ...emptyStats, chutesNoAlvo: 1, golEsperado: chanceGoalKick },
    })
    moments = moments.concat(responseDefense.moments)
    proxChance = responseDefense.proxChance
    const momentCorner: MomentComplete = {
      minute,
      narracao: `É escanteio para o ${nameClub}!`,
      homeOrAway,
      stats: emptyStats,
      domainAway: domain.away,
      domainHome: domain.home,
      id: 0,
    }
    moments.push(momentCorner)
    proxChance = 'CORNER KICK'
  } else if (numberRandom < 80) {
    // defesa goleiro
    const responseKickOut = defenseChangePosse({
      minute,
      domain,
      homeOrAway,
      type: 'HOLD GOALKEEPER',
      stats: { ...emptyStats, chutesNoAlvo: 1, golEsperado: chanceGoalKick },
    })
    moments = moments.concat(responseKickOut.moments)
    proxChance = responseKickOut.proxChance
  } else {
    // goal
    const moment = goalMoment(
      minute,
      nameClub,
      homeOrAway,
      chanceGoalKick,
      domain,
    )
    moments.push(moment)
  }

  const moment: ChanceGoalMomentReturn = {
    moments,
    proxChance,
  }
  return moment
}

export function getLongKick({
  minute,
  nameClub,
  homeOrAway,
  domain,
}: ChanceGoalMomentProps): ChanceGoalMomentReturn {
  let moments: MomentComplete[] = []
  let proxChance: ProxChanceClub = 'NORMAL'
  //   3. CHUTE DE LONGE
  //     3.1 GOL 0.1
  //     3.2 DEFESA 0.3
  //     3.3 BLOQUEADO 0.1
  //     3.1 FORA 0.5
  const numberRandom = Math.floor(Math.random() * 100)
  const chanceGoalKick = 0.2 // 0.1
  if (numberRandom < 10) {
    // goal
    const moment = golacoMoment(
      minute,
      nameClub,
      homeOrAway,
      chanceGoalKick,
      domain,
    )
    moments.push(moment)
  } else if (numberRandom < 20) {
    // bloqueado
    const responseKickOut = defenseParcial({
      minute,
      domain,
      homeOrAway,
      type: 'KICK BLOCKED',
      stats: { ...emptyStats, chutesBloqueado: 1, golEsperado: chanceGoalKick },
    })
    moments = moments.concat(responseKickOut.moments)
    proxChance = responseKickOut.proxChance
  } else if (numberRandom < 40) {
    // defesa do goleiro
    const response = defenseChangePosse({
      minute,
      domain,
      homeOrAway,
      type: 'HOLD GOALKEEPER',
      stats: { ...emptyStats, chutesNoAlvo: 1, golEsperado: chanceGoalKick },
    })
    moments = moments.concat(response.moments)
    proxChance = response.proxChance
  } else {
    // fora
    const responseKickOut = defenseChangePosse({
      minute,
      domain,
      homeOrAway,
      type: 'KICK OUT',
      stats: { ...emptyStats, chutesFora: 1, golEsperado: chanceGoalKick },
    })
    moments = moments.concat(responseKickOut.moments)
    proxChance = responseKickOut.proxChance
  }

  const moment: ChanceGoalMomentReturn = {
    moments,
    proxChance,
  }

  return moment
}

export function getLongFreeKick({
  minute,
  nameClub,
  homeOrAway,
  domain,
}: ChanceGoalMomentProps): ChanceGoalMomentReturn {
  let moments: MomentComplete[] = []
  let proxChance: ProxChanceClub = 'NORMAL'
  //   2. LONGE
  //     4.1 GOLAÇO 0.05
  //     4.2 BATE NA BARREIRA 0.05
  //     4.3 FORA 0.30
  //     4.4 CRUZAMENTO 0.6
  const moment: MomentComplete = {
    minute,
    homeOrAway,
    narracao: `O ${nameClub} se prepara para bater a falta de longa distância`,
    stats: emptyStats,
    domainAway: domain.away,
    domainHome: domain.home,
    id: 0,
  }
  moments.push(moment)

  const numberRandom = Math.floor(Math.random() * 100)
  if (numberRandom < 40) {
    const moment2: MomentComplete = {
      minute,
      homeOrAway,
      narracao: `O jogador vai bater direto.`,
      stats: emptyStats,
      domainAway: domain.away,
      domainHome: domain.home,
      id: 0,
    }
    moments.push(moment2)

    const numberRandom2 = Math.floor(Math.random() * 100)
    const chanceGoalKick = 0.1
    if (numberRandom2 < 10) {
      // barreira
      const moment3: MomentComplete = {
        minute,
        homeOrAway,
        narracao: 'A bola bate na barreira e sai.',
        stats: {
          ...emptyStats,
          chutesBloqueado: 1,
          golEsperado: chanceGoalKick,
        },
        domainAway: domain.away + (homeOrAway === 'home' ? 15 : -15),
        domainHome: domain.home + (homeOrAway === 'home' ? -15 : 15),
        id: 0,
      }
      moments.push(moment3)
    } else if (numberRandom2 < 20) {
      // golaço
      const moment = golacoMoment(
        minute,
        nameClub,
        homeOrAway,
        chanceGoalKick,
        domain,
      )
      moments.push(moment)
    } else {
      // fora
      const responseKickOut = defenseChangePosse({
        minute,
        domain,
        homeOrAway,
        type: 'KICK OUT',
        stats: { ...emptyStats, chutesFora: 1, golEsperado: chanceGoalKick },
      })
      moments = moments.concat(responseKickOut.moments)
      proxChance = responseKickOut.proxChance
    }
  } else {
    const moment2: MomentComplete = {
      minute,
      homeOrAway,
      narracao: `O jogador vai mandar a bola na área.`,
      stats: emptyStats,
      domainAway: domain.away,
      domainHome: domain.home,
      id: 0,
    }
    moments.push(moment2)
    // cruzamento
    const response = momentLongCross({ minute, domain, homeOrAway, nameClub })
    moments = moments.concat(response.moments)
    proxChance = response.proxChance
  }

  const chanceGoal: ChanceGoalMomentReturn = {
    moments,
    proxChance,
  }

  return chanceGoal
}

export function getShortFreeKick({
  minute,
  nameClub,
  homeOrAway,
  domain,
}: ChanceGoalMomentProps): ChanceGoalMomentReturn {
  let moments: MomentComplete[] = []
  let proxChance: ProxChanceClub = 'NORMAL'
  //  1. PERTO
  //    4.1 GOL 0.2
  //    4.2 BATE NA BARREIRA 0.3
  //    4.3 FORA 0.3
  //    4.4 DEFESA 0.2
  const moment: MomentComplete = {
    minute,
    homeOrAway,
    narracao: `O ${nameClub} se prepara para bater a falta próximo a grande área.`,
    stats: emptyStats,
    domainAway: domain.away,
    domainHome: domain.home,
    id: 0,
  }
  moments.push(moment)

  const numberRandom = Math.floor(Math.random() * 100)
  const chanceGoalKick = 0.3 // 0.2
  if (numberRandom >= 70) {
    // barreira
    const moment3: MomentComplete = {
      minute,
      homeOrAway,
      narracao:
        numberRandom < 15
          ? 'Bate na barreira e sai para linha de fundo'
          : 'A bola ficou na barreira.',
      stats: { ...emptyStats, chutesBloqueado: 1, golEsperado: chanceGoalKick },
      domainAway: domain.away + (homeOrAway === 'home' ? 20 : -20),
      domainHome: domain.home + (homeOrAway === 'home' ? -20 : 20),
      id: 0,
    }
    moments.push(moment3)
    if (numberRandom < 15) {
      const momentCorner: MomentComplete = {
        minute,
        narracao: `É escanteio para o ${nameClub}!`,
        homeOrAway,
        stats: emptyStats,
        domainAway: domain.away,
        domainHome: domain.home,
        id: 0,
      }
      moments.push(momentCorner)
      proxChance = 'CORNER KICK'
    }
  } else {
    const moment2: MomentComplete = {
      minute,
      homeOrAway,
      narracao: 'A bola passa pela barreira.',
      stats: emptyStats,
      domainAway: domain.away,
      domainHome: domain.home,
      id: 0,
    }
    moments.push(moment2)
  }

  if (numberRandom < 20) {
    // goal
    const moment = goalMoment(
      minute,
      nameClub,
      homeOrAway,
      chanceGoalKick,
      domain,
    )
    moments.push(moment)
  } else if (numberRandom < 40) {
    // defesa
    const response = defenseChangePosse({
      minute,
      domain,
      homeOrAway,
      type: 'DEFENSE GOALKEEPER',
      stats: { ...emptyStats, chutesNoAlvo: 1, golEsperado: chanceGoalKick },
    })
    moments = moments.concat(response.moments)
    proxChance = response.proxChance
    if (numberRandom < 55) {
      const momentCorner: MomentComplete = {
        minute,
        narracao: `É escanteio para o ${nameClub}!`,
        homeOrAway,
        stats: emptyStats,
        domainAway: domain.away,
        domainHome: domain.home,
        id: 0,
      }
      moments.push(momentCorner)
      proxChance = 'CORNER KICK'
    }
  } else if (numberRandom < 70) {
    // fora
    const response = defenseChangePosse({
      minute,
      domain,
      homeOrAway,
      type: 'KICK OUT',
      stats: { ...emptyStats, chutesFora: 1, golEsperado: chanceGoalKick },
    })
    moments = moments.concat(response.moments)
    proxChance = response.proxChance
  }

  const changeGoal: ChanceGoalMomentReturn = {
    moments,
    proxChance,
  }

  return changeGoal
}

export function getReboundKick({
  minute,
  nameClub,
  homeOrAway,
  domain,
}: ChanceGoalMomentProps): ChanceGoalMomentReturn {
  let moments: MomentComplete[] = []
  let proxChance: ProxChanceClub = 'NORMAL'
  //   5. REBOTE
  //     5.1 GOL 0.7
  //     5.2 DEFESA 0.1
  //     5.3 BLOQUEADO 0.1
  //     5.4 FORA 0.1
  const moment: MomentComplete = {
    minute,
    narracao: 'A bola sobra para o atacante.',
    homeOrAway,
    stats: emptyStats,
    domainAway: domain.away,
    domainHome: domain.home,
    id: 0,
  }
  moments.push(moment)

  const numberRandom = Math.floor(Math.random() * 100)
  const chanceGoalKick = 0.8
  if (numberRandom < 10) {
    // fora
    const response = defenseChangePosse({
      minute,
      domain,
      homeOrAway,
      type: 'KICK OUT',
      stats: { ...emptyStats, chutesFora: 1, golEsperado: chanceGoalKick },
    })
    moments = moments.concat(response.moments)
    proxChance = response.proxChance
  } else if (numberRandom < 20) {
    // bloqueado
    const response = defenseParcial({
      minute,
      domain,
      homeOrAway,
      type: 'KICK BLOCKED',
      stats: { ...emptyStats, chutesBloqueado: 1, golEsperado: chanceGoalKick },
    })
    moments = moments.concat(response.moments)
    proxChance = response.proxChance
  } else if (numberRandom < 30) {
    // defesa
    const response = defenseChangePosse({
      minute,
      domain,
      homeOrAway,
      type: 'HOLD GOALKEEPER',
      stats: { ...emptyStats, chutesNoAlvo: 1, golEsperado: chanceGoalKick },
    })
    moments = moments.concat(response.moments)
    proxChance = response.proxChance
  } else {
    // goal
    const moment = goalMoment(
      minute,
      nameClub,
      homeOrAway,
      chanceGoalKick,
      domain,
    )
    moments.push(moment)
  }

  const chanceGoal: ChanceGoalMomentReturn = {
    moments,
    proxChance,
  }

  return chanceGoal
}

export function getPenaltKick({
  minute,
  nameClub,
  homeOrAway,
  domain,
}: ChanceGoalMomentProps): ChanceGoalMomentReturn {
  let moments: MomentComplete[] = []
  let proxChance: ProxChanceClub = 'NORMAL'
  //   6. PENALTI
  //     5. GOL 0.7
  //     6. DEFESA 0.15
  //     7. FORA 0.1
  //     8. REBOTE 0.05
  const moment: MomentComplete = {
    minute,
    narracao: 'O jogador se prepara para cobrar o penalti.',
    homeOrAway,
    stats: emptyStats,
    domainAway: domain.away,
    domainHome: domain.home,
    id: 0,
  }
  moments.push(moment)

  const numberRandom = Math.floor(Math.random() * 100)
  const chanceGoalKick = 0.8
  if (numberRandom < 10) {
    // rebote
    const moment2: MomentComplete = {
      minute,
      narracao: 'Espalma errado o goleiro.',
      homeOrAway,
      stats: { ...emptyStats, chutesNoAlvo: 1, golEsperado: chanceGoalKick },
      domainAway: domain.away,
      domainHome: domain.home,
      id: 0,
    }
    moments.push(moment2)
    const response = getReboundKick({
      minute,
      domain,
      homeOrAway,
      nameClub,
    })
    moments = moments.concat(response.moments)
    proxChance = response.proxChance
  } else if (numberRandom < 20) {
    // fora
    const response = defenseChangePosse({
      minute,
      domain,
      homeOrAway,
      type: 'KICK OUT',
      stats: { ...emptyStats, chutesFora: 1, golEsperado: chanceGoalKick },
    })
    moments = moments.concat(response.moments)
    proxChance = response.proxChance
  } else if (numberRandom < 30) {
    // defesa goleiro
    const response = defenseChangePosse({
      minute,
      domain,
      homeOrAway,
      type: 'DEFENSE GOALKEEPER',
      stats: { ...emptyStats, chutesNoAlvo: 1, golEsperado: chanceGoalKick },
    })
    moments = moments.concat(response.moments)
    proxChance = response.proxChance
  } else {
    // goal
    const moment = goalMoment(minute, nameClub, homeOrAway, chanceGoalKick, {
      home: domain.home,
      away: domain.away,
    })
    moments.push(moment)
  }

  const chanceGoal: ChanceGoalMomentReturn = {
    moments,
    proxChance,
  }

  return chanceGoal
}

export function momentShortCross({
  minute,
  domain,
  nameClub,
  homeOrAway,
}: ChanceGoalMomentProps) {
  const numberRandom = Math.floor(Math.random() * 100)
  let moments: MomentComplete[] = []
  let proxChance: ProxChanceClub = 'NORMAL'
  if (numberRandom > 30) {
    const moment: MomentComplete = {
      minute,
      narracao: `Faz o cruzamento curto.`,
      homeOrAway,
      stats: emptyStats,
      domainAway: domain.away,
      domainHome: domain.home,
      id: 0,
    }
    moments.push(moment)

    const numberRandom2 = Math.floor(Math.random() * 100)
    if (numberRandom2 < 40) {
      const respHeadKick = getHeadKick({ minute, homeOrAway, nameClub, domain })
      moments = moments.concat(respHeadKick.moments)
      proxChance = respHeadKick.proxChance
    } else if (numberRandom2 < 70) {
      const respShortKick = getShortKick({
        minute,
        homeOrAway,
        nameClub,
        domain,
      })
      moments = moments.concat(respShortKick.moments)
      proxChance = respShortKick.proxChance
    } else if (numberRandom2 < 80) {
      const respDefendeGoalpeeker = defenseChangePosse({
        minute,
        domain,
        homeOrAway,
        type: 'GOALKEEPER',
      })
      moments = moments.concat(respDefendeGoalpeeker.moments)
      proxChance = respDefendeGoalpeeker.proxChance
    } else if (numberRandom2 < 90) {
      const momentCorner: MomentComplete = {
        minute,
        narracao: 'A defesa corta para linha de fundo. É escanteio',
        homeOrAway,
        stats: emptyStats,
        domainAway: domain.away,
        domainHome: domain.home,
        id: 0,
      }
      moments.push(momentCorner)
      proxChance = 'CORNER KICK'
    } else {
      const respDefense = defenseParcial({
        minute,
        domain,
        homeOrAway,
        type: 'DEFENSE',
      })
      moments = moments.concat(respDefense.moments)
      proxChance = respDefense.proxChance
    }
  } else {
    const moment: MomentComplete = {
      minute,
      narracao: `Chega a linha de fundo e faz o passe para trás.`,
      homeOrAway,
      stats: emptyStats,
      domainAway: domain.away,
      domainHome: domain.home,
      id: 0,
    }
    moments.push(moment)

    const numberRandom2 = Math.floor(Math.random() * 100)
    if (numberRandom2 < 30) {
      const respShortKick = getShortKick({
        minute,
        homeOrAway,
        nameClub,
        domain,
      })
      moments = moments.concat(respShortKick.moments)
      proxChance = respShortKick.proxChance
    } else if (numberRandom2 < 40) {
      const respShortKick = getKick({
        minute,
        homeOrAway,
        nameClub,
        domain,
      })
      moments = moments.concat(respShortKick.moments)
      proxChance = respShortKick.proxChance
    } else if (numberRandom2 < 80) {
      const respDefendeGoalpeeker = defenseChangePosse({
        minute,
        domain,
        homeOrAway,
        type: 'GOALKEEPER',
      })
      moments = moments.concat(respDefendeGoalpeeker.moments)
      proxChance = respDefendeGoalpeeker.proxChance
    } else if (numberRandom2 < 90) {
      const momentCorner: MomentComplete = {
        minute,
        narracao: 'A defesa corta para linha de fundo. É escanteio',
        homeOrAway,
        stats: emptyStats,
        domainAway: domain.away,
        domainHome: domain.home,
        id: 0,
      }
      moments.push(momentCorner)
      proxChance = 'CORNER KICK'
    } else {
      const respDefense = defenseParcial({
        minute,
        domain,
        homeOrAway,
        type: 'DEFENSE',
      })
      moments = moments.concat(respDefense.moments)
      proxChance = respDefense.proxChance
    }
  }

  const changeGoalDomain: ChanceGoalMomentReturn = {
    moments,
    proxChance,
  }

  return changeGoalDomain
}

export function momentLongCross({
  minute,
  domain,
  nameClub,
  homeOrAway,
}: ChanceGoalMomentProps) {
  let moments: MomentComplete[] = []
  let proxChance: ProxChanceClub = 'NORMAL'

  const numberRandom = Math.floor(Math.random() * 100)
  const moment: MomentComplete = {
    minute,
    narracao: `O ${nameClub} faz o cruzamento na ${numberRandom > 50 ? 'primeira' : 'segunda'} trave.`,
    homeOrAway,
    stats: emptyStats,
    domainAway: domain.away,
    domainHome: domain.home,
    id: 0,
  }
  moments.push(moment)
  // 1. A DEFESA TIRA 0.4
  // 2. O GOLEIRO FICA COM ELA 0.2
  // 3. -> CABEÇADA 0.4
  if (numberRandom < 20) {
    const respDefense = defenseChangePosse({
      minute,
      domain,
      homeOrAway,
      type: 'GOALKEEPER',
    })
    moments = moments.concat(respDefense.moments)
    proxChance = respDefense.proxChance
  } else if (numberRandom < 70) {
    const respHeadKick = getHeadKick({ minute, homeOrAway, nameClub, domain })
    moments = moments.concat(respHeadKick.moments)
    proxChance = respHeadKick.proxChance
  } else {
    const respDefense = defenseParcial({
      minute,
      domain,
      homeOrAway,
      type: 'DEFENSE',
    })
    moments = moments.concat(respDefense.moments)
    proxChance = respDefense.proxChance
  }

  const changeGoalDomain: ChanceGoalMomentReturn = {
    moments,
    proxChance,
  }

  return changeGoalDomain
}
