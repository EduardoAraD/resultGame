import { MomentComplete } from '../../../Model/Moment'
import { emptyStats } from '../../../Model/Stats'

import {
  getKick,
  getLongFreeKick,
  getLongKick,
  getPenaltKick,
  getShortFreeKick,
  getShortKick,
  momentLongCross,
  momentShortCross,
} from './changeGoal'
import { defenseChangePosse } from './defensePlay'
import {
  ChanceGoalMomentDualClubsProps,
  ChanceGoalMomentProps,
  ChanceGoalMomentReturn,
  ProxChanceClub,
} from './interfaces'

function momentLaunch({
  minute,
  domain,
  nameClubAttack,
  nameClubDefense,
  homeOrAway,
}: ChanceGoalMomentDualClubsProps) {
  let moments: MomentComplete[] = []
  let proxChance: ProxChanceClub = 'NORMAL'

  const numberRandom = Math.floor(Math.random() * 100)
  if (numberRandom < 50) {
    const moment: MomentComplete = {
      minute,
      narracao: `Faz o lançamento em profundidade atrás da defesa.`,
      homeOrAway,
      stats: emptyStats,
      domainAway: domain.away,
      domainHome: domain.home,
      id: 0,
    }
    moments.push(moment)
    const numberRandom2 = Math.floor(Math.random() * 100)
    //     1. FORTE DEMAIS, FICOU COM O GOLEIRO 0.6
    //     2. CORTA A DEFESA 0.3
    //     3. DOMINOU E FICOU NA CARA DO GOL 0.1
    //       -> CHUTE DE CARA PRO GOL
    if (numberRandom2 < 40) {
      const moment: MomentComplete = {
        minute,
        narracao: `O lançamento foi forte demais e a bola fica com o goleiro.`,
        homeOrAway,
        stats: emptyStats,
        domainAway: domain.away + (homeOrAway === 'home' ? 15 : -15),
        domainHome: domain.home + (homeOrAway === 'home' ? -15 : 15),
        id: 0,
      }
      moments.push(moment)
    } else if (numberRandom2 < 75) {
      const moment: MomentComplete = {
        minute,
        narracao: `Corta a defesa, mas o ${nameClubAttack} mantém a posse de bola.`,
        homeOrAway,
        stats: emptyStats,
        domainAway: domain.away + (homeOrAway === 'away' ? -5 : 5),
        domainHome: domain.home + (homeOrAway === 'home' ? -5 : 5),
        id: 0,
      }
      moments.push(moment)
    } else {
      const moment: MomentComplete = {
        minute,
        narracao: `O jogador domina e parte para o gol.`,
        homeOrAway,
        stats: emptyStats,
        domainAway: domain.away,
        domainHome: domain.home,
        id: 0,
      }
      moments.push(moment)
      const resultChance = getShortKick({
        minute,
        homeOrAway,
        nameClub: nameClubAttack,
        domain,
      })
      moments = moments.concat(resultChance.moments)
      proxChance = resultChance.proxChance
    }
  } else {
    const momentInicio: MomentComplete = {
      minute,
      narracao: `Faz o lançamento em profundidade pela ponta ${numberRandom > 25 ? 'direita' : 'esquerda'}.`,
      homeOrAway,
      stats: emptyStats,
      domainAway: domain.away,
      domainHome: domain.home,
      id: 0,
    }
    moments.push(momentInicio)

    // 2. LANÇAMENTO EM PROFUNDIDADE NA PONTA
    //   1. FORTE DEMAIS E A BOLA SAI 0.15
    //   2. CORTA A DEFESA 0.15
    //   3. RECEBEU A BOLA O PONTA 0.7
    //     -> JOGADA LATERAL 2.1
    const numberRandom2 = Math.floor(Math.random() * 100)
    if (numberRandom2 < 10) {
      const moment: MomentComplete = {
        minute,
        narracao: `O lançamento vai forte demais, apenas lateral para o ${nameClubDefense}`,
        homeOrAway,
        stats: emptyStats,
        domainAway: domain.away + (homeOrAway === 'home' ? 15 : -15),
        domainHome: domain.home + (homeOrAway === 'home' ? -15 : 15),
        id: 0,
      }
      moments.push(moment)
    } else if (numberRandom2 < 20) {
      const moment: MomentComplete = {
        minute,
        narracao: `A defesa intercepta e a posse muda de lado`,
        homeOrAway,
        stats: emptyStats,
        domainAway: domain.away + (homeOrAway === 'home' ? 15 : -15),
        domainHome: domain.home + (homeOrAway === 'home' ? -15 : 15),
        id: 0,
      }
      moments.push(moment)
    } else {
      const response = momentSidePlay({
        minute,
        homeOrAway,
        nameClub: nameClubAttack,
        domain,
      })
      moments = moments.concat(response.moments)
      proxChance = response.proxChance
    }
  }

  const changeGoalDomain: ChanceGoalMomentReturn = {
    moments,
    proxChance,
  }

  return changeGoalDomain
  // 1. LANÇAMENTO
  //   1. LANÇAMENTO EM PROFUNDIDADE POR TRÁS DO ZAGUEIRO
  //     1. FORTE DEMAIS, FICOU COM O GOLEIRO 0.6
  //     2. CORTA A DEFESA 0.3
  //     3. DOMINOU E FICOU NA CARA DO GOL 0.1
  //       -> CHUTE DE CARA PRO GOL
  //   2. LANÇAMENTO EM PROFUNDIDADE NA PONTA
  //     1. FORTE DEMAIS E A BOLA SAI 0.2
  //     2. CORTA A DEFESA 0.2
  //     3. RECEBEU A BOLA O PONTA 0.6
  //       -> JOGADA LATERAL 2.1
}

function momentSidePlay({
  domain,
  nameClub,
  minute,
  homeOrAway,
}: ChanceGoalMomentProps) {
  let moments: MomentComplete[] = []
  let proxChance: ProxChanceClub = 'NORMAL'

  const numberRandom = Math.floor(Math.random() * 100)

  const moment: MomentComplete = {
    minute,
    narracao: `Consegui o domínio pela ponta ${numberRandom < 50 ? 'esquerda' : 'direita'}.`,
    homeOrAway,
    stats: emptyStats,
    domainAway: domain.away,
    domainHome: domain.home,
    id: 0,
  }
  moments.push(moment)

  if (numberRandom < 25) {
    const moment2: MomentComplete = {
      minute,
      narracao: `O jogador faz o dribe e parte para a grande área.`,
      homeOrAway,
      stats: emptyStats,
      domainAway: domain.away,
      domainHome: domain.home,
      id: 0,
    }
    moments.push(moment2)

    const responseShortCross = momentShortCross({
      minute,
      homeOrAway,
      nameClub,
      domain,
    })
    moments = moments.concat(responseShortCross.moments)
    proxChance = responseShortCross.proxChance
  } else if (numberRandom < 85) {
    const moment2: MomentComplete = {
      minute,
      narracao: `Acha o espaço e cruza a bola na área.`,
      homeOrAway,
      stats: emptyStats,
      domainAway: domain.away,
      domainHome: domain.home,
      id: 0,
    }
    moments.push(moment2)
    const responseCross = momentLongCross({
      minute,
      homeOrAway,
      nameClub,
      domain,
    })
    moments = moments.concat(responseCross.moments)
    proxChance = responseCross.proxChance
  } else {
    const moment2: MomentComplete = {
      minute,
      narracao: `Tentou passar pela defesa e não conseguiu. A posse troca de lado.`,
      homeOrAway,
      stats: emptyStats,
      domainAway: domain.away + (homeOrAway === 'home' ? 20 : -20),
      domainHome: domain.home + (homeOrAway === 'home' ? -20 : 20),
      id: 0,
    }
    moments.push(moment2)
  }

  // O PASSE VEM PARA A LATERAL
  //   2.1 PROCURA O ESPAÇO PARA O CRUZAMENTO
  //     1. ACHA UM ESPEÇO MELHOR E VAI EM DIREÇÃO A GRANDE AREA 0.1
  //       -> CRUZAMENTO PASSE CURTO
  //     2. CRUZAMENTO CRUZAMENTO 0.5
  //     3. A DEFESA CORTA E RETOMA A POSSE DE BOLA 0.4

  const changeGoalDomain: ChanceGoalMomentReturn = {
    moments,
    proxChance,
  }

  return changeGoalDomain
}

function momentCentralPlay({
  minute,
  nameClub,
  homeOrAway,
  domain,
}: ChanceGoalMomentProps) {
  let moments: MomentComplete[] = []
  let proxChance: ProxChanceClub = 'NORMAL'

  const moment: MomentComplete = {
    minute,
    narracao: `Vem chegando pelo meio.`,
    homeOrAway,
    stats: emptyStats,
    domainAway: domain.away,
    domainHome: domain.home,
    id: 0,
  }
  moments.push(moment)
  const numberRandom = Math.floor(Math.random() * 100)
  if (numberRandom < 30) {
    // passe em profundiade
    const moment2: MomentComplete = {
      minute,
      narracao: `Tenta fazer o passe em profundidade.`,
      homeOrAway,
      stats: emptyStats,
      domainAway: domain.away,
      domainHome: domain.home,
      id: 0,
    }
    moments.push(moment2)
    const numberRandom2 = Math.floor(Math.random() * 100)
    if (numberRandom2 < 35) {
      const moment3: MomentComplete = {
        minute,
        narracao: `Fez o passe nas costas da defesa. O ${nameClub} parte para o gol`,
        homeOrAway,
        stats: emptyStats,
        domainAway: domain.away,
        domainHome: domain.home,
        id: 0,
      }
      moments.push(moment3)
      const resultChance = getShortKick({
        minute,
        homeOrAway,
        nameClub,
        domain,
      })
      moments = moments.concat(resultChance.moments)
      proxChance = resultChance.proxChance
    } else if (numberRandom2 < 50) {
      const moment3: MomentComplete = {
        minute,
        narracao: 'Isso é falta! Derrubaram o jogador na hora do passe.',
        homeOrAway,
        stats: emptyStats,
        domainAway: domain.away,
        domainHome: domain.home,
        id: 0,
      }
      moments.push(moment3)
      proxChance = 'SHORT FREE'
    } else {
      const responseDefense = defenseChangePosse({
        minute,
        domain,
        homeOrAway,
        type: 'WRONG PASS',
      })
      moments = moments.concat(responseDefense.moments)
      proxChance = responseDefense.proxChance
    }
  } else {
    // passe
    const moment2: MomentComplete = {
      minute,
      narracao: `Tenta fazer o passe para frente.`,
      homeOrAway,
      stats: emptyStats,
      domainAway: domain.away,
      domainHome: domain.home,
      id: 0,
    }
    moments.push(moment2)
    const numberRandom2 = Math.floor(Math.random() * 100)
    if (numberRandom2 < 15) {
      const responseDefense = defenseChangePosse({
        minute,
        domain,
        homeOrAway,
        type: 'WRONG PASS',
      })
      moments = moments.concat(responseDefense.moments)
      proxChance = responseDefense.proxChance
    } else if (numberRandom2 < 50) {
      const moment3: MomentComplete = {
        minute,
        narracao: 'Faz a tabela e acha uma oportunidade para chute.',
        homeOrAway,
        stats: emptyStats,
        domainAway: domain.away,
        domainHome: domain.home,
        id: 0,
      }
      moments.push(moment3)
      const resultChance = getKick({
        minute,
        homeOrAway,
        nameClub,
        domain,
      })
      moments = moments.concat(resultChance.moments)
      proxChance = resultChance.proxChance
    } else if (numberRandom2 < 60) {
      const moment3: MomentComplete = {
        minute,
        narracao: 'Falta marcada! Uma chegada forte no jogador',
        homeOrAway,
        stats: emptyStats,
        domainAway: domain.away,
        domainHome: domain.home,
        id: 0,
      }
      moments.push(moment3)
      proxChance = 'LONG FREE'
    } else {
      const moment3: MomentComplete = {
        minute,
        narracao: `O ${nameClub} vai arriscar de longe.`,
        homeOrAway,
        stats: emptyStats,
        domainAway: domain.away,
        domainHome: domain.home,
        id: 0,
      }
      moments.push(moment3)
      const resultChance = getLongKick({
        minute,
        homeOrAway,
        nameClub,
        domain,
      })
      moments = moments.concat(resultChance.moments)
      proxChance = resultChance.proxChance
    }
  }

  // MENTEM A POSSE E BUSCA ESPACO
  //   TENTA O PASSE PARA FRENTE
  //   2. ACHA UM PASSE INTERESSANTE NO MEIO DA DEFESA 0.3
  //     RECEBE A BOLA E FAZ O PASSE PARA O CHUTE DO COMPANHEIRO
  //       -> CHUTE
  //   3. VOLTA A BOLA 0.4
  //     TENTA O CHUTE DE LONGE
  //     -> CHUTE LONGE
  //   3. ERROU O PASSE 0.2

  const changeGoalDomain: ChanceGoalMomentReturn = {
    moments,
    proxChance,
  }

  return changeGoalDomain
}

function momentBallPossetion({
  minute,
  domain,
  nameClub,
  homeOrAway,
}: ChanceGoalMomentProps): ChanceGoalMomentReturn {
  let moments: MomentComplete[] = []
  let proxChance: ProxChanceClub = 'NORMAL'

  const numberRandom = Math.floor(Math.random() * 100)

  if (numberRandom < 50) {
    const responseSide = momentSidePlay({
      minute,
      domain,
      homeOrAway,
      nameClub,
    })
    moments = moments.concat(responseSide.moments)
    proxChance = responseSide.proxChance
  } else {
    const responseCentral = momentCentralPlay({
      minute,
      domain,
      homeOrAway,
      nameClub,
    })
    moments = moments.concat(responseCentral.moments)
    proxChance = responseCentral.proxChance
  }

  const changeGoalDomain: ChanceGoalMomentReturn = {
    moments,
    proxChance,
  }

  return changeGoalDomain
}

function momentCornerKick({
  minute,
  domain,
  nameClub,
  homeOrAway,
}: ChanceGoalMomentProps): ChanceGoalMomentReturn {
  let moments: MomentComplete[] = []
  let proxChance: ProxChanceClub = 'NORMAL'

  const moment: MomentComplete = {
    minute,
    narracao: `Vai ser cobrado escanteio para o ${nameClub}.`,
    homeOrAway,
    stats: emptyStats,
    domainAway: domain.away,
    domainHome: domain.home,
    id: 0,
  }
  moments.push(moment)
  const numberRandom = Math.floor(Math.random() * 100)
  if (numberRandom < 30) {
    const moment: MomentComplete = {
      minute,
      narracao: 'Faz o passe curto',
      homeOrAway,
      stats: emptyStats,
      domainAway: domain.away,
      domainHome: domain.home,
      id: 0,
    }
    moments.push(moment)
    const response = momentShortCross({
      minute,
      homeOrAway,
      nameClub,
      domain,
    })
    moments = moments.concat(response.moments)
    proxChance = response.proxChance
  } else {
    const response = momentLongCross({
      minute,
      homeOrAway,
      nameClub,
      domain,
    })
    moments = moments.concat(response.moments)
    proxChance = response.proxChance
  }

  const changeGoalDomain: ChanceGoalMomentReturn = {
    moments,
    proxChance,
  }

  return changeGoalDomain
}

export function getChanceGoal({
  minute,
  domain,
  nameClubAttack,
  nameClubDefense,
  homeOrAway,
  proxMoment = 'NORMAL',
}: ChanceGoalMomentDualClubsProps): ChanceGoalMomentReturn {
  switch (proxMoment) {
    case 'CORNER KICK':
      return momentCornerKick({
        minute,
        domain,
        homeOrAway,
        nameClub: nameClubAttack,
      })
    case 'LONG FREE': {
      return getLongFreeKick({
        minute,
        domain,
        homeOrAway,
        nameClub: nameClubAttack,
      })
    }
    case 'SHORT FREE':
      return getShortFreeKick({
        minute,
        domain,
        homeOrAway,
        nameClub: nameClubAttack,
      })
    case 'PENALT':
      return getPenaltKick({
        minute,
        domain,
        homeOrAway,
        nameClub: nameClubAttack,
      })
    case 'NORMAL': {
      let moments: MomentComplete[] = []
      let proxChance: ProxChanceClub = 'NORMAL'

      const momentInicio: MomentComplete = {
        minute,
        narracao: `O ${nameClubAttack} tem a posse de bola.`,
        homeOrAway,
        stats: emptyStats,
        domainAway: domain.away,
        domainHome: domain.home,
        id: 0,
      }
      moments.push(momentInicio)

      const numberRandom = Math.floor(Math.random() * 100)
      if (numberRandom <= 30) {
        const responseLaunch = momentLaunch({
          minute,
          domain,
          homeOrAway,
          nameClubAttack,
          nameClubDefense,
        })
        moments = moments.concat(responseLaunch.moments)
        proxChance = responseLaunch.proxChance
      } else {
        const responsePosse = momentBallPossetion({
          minute,
          domain,
          homeOrAway,
          nameClub: nameClubAttack,
        })
        moments = moments.concat(responsePosse.moments)
        proxChance = responsePosse.proxChance
      }

      const changeGoalDomain: ChanceGoalMomentReturn = {
        moments,
        proxChance,
      }

      return changeGoalDomain
    }
  }
}
