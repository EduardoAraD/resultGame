import { MomentComplete } from '../../../Model/Moment'
import { emptyStats } from '../../../Model/Stats'

export function currentPlacarMoment(
  minute: number,
  nameClub: string,
  homeOrAway: 'home' | 'away',
  goalHome: number,
  goalAway: number,
): MomentComplete {
  function getNarrationWithDiffGoal(diffGoal: number) {
    const messagePlacar = `${goalHome}x${goalAway} no placar!`
    switch (diffGoal) {
      case 0:
        return `E agora está tudo empatado. ${messagePlacar}`
      case 1:
        return `O ${nameClub} está na frente. ${messagePlacar}`
      case -1:
        return `A ventagem cai para um gol. ${messagePlacar}`
      default: {
        if (diffGoal > 1) {
          if (diffGoal >= 3) {
            return `Já é goleada. O ${nameClub} faz ${messagePlacar}`
          } else {
            return `O ${nameClub} aumenta a vantegem. ${messagePlacar}`
          }
        } else {
          return `O ${nameClub} diminui. ${messagePlacar}`
        }
      }
    }
  }

  const diff = homeOrAway === 'home' ? goalHome - goalAway : goalAway - goalHome

  const message = getNarrationWithDiffGoal(diff)

  const moment: MomentComplete = {
    minute,
    narracao: message,
    homeOrAway,
    stats: emptyStats,
    domainAway: 50,
    domainHome: 50,
    id: 0,
  }

  return moment
}

export function golacoMoment(
  minute: number,
  nameClub: string,
  homeOrAway: 'home' | 'away',
  golEsperado: number,
  domain: {
    home: number
    away: number
  },
): MomentComplete {
  const moment: MomentComplete = {
    minute,
    narracao: `Goooooooolaço do ${nameClub}.`,
    goal: true,
    homeOrAway,
    stats: {
      ...emptyStats,
      chutesNoAlvo: 1,
      golEsperado,
    },
    domainAway: domain.away,
    domainHome: domain.home,
    id: 0,
  }

  return moment
}

export function goalMoment(
  minute: number,
  nameClub: string,
  homeOrAway: 'home' | 'away',
  golEsperado: number,
  domain: {
    home: number
    away: number
  },
): MomentComplete {
  const moment: MomentComplete = {
    minute,
    narracao: `Gooooooooll do ${nameClub}.`,
    goal: true,
    homeOrAway,
    stats: {
      ...emptyStats,
      chutesNoAlvo: 1,
      golEsperado,
    },
    domainHome: domain.home,
    domainAway: domain.away,
    id: 0,
  }

  return moment
}

export function narrationDefenseTakeAwayBall() {
  const numberRandom = Math.floor(Math.random() * 100)
  if (numberRandom < 33) return 'Tira a defesa de qualquer maneira'
  else if (numberRandom < 66) return 'A defesa corta e afasta o perigo'
  else return 'Corta a defesa e afasta o perigo'
}

export function narrationBallGoalkeeper() {
  const numberRandom = Math.floor(Math.random() * 100)
  if (numberRandom < 50) return 'Goleiro segura a bola e alivia a defesa'
  else return 'O goleiro se antecipa e segura a bola'
}

export function narrationWrongPass() {
  const numberRandom = Math.floor(Math.random() * 100)
  if (numberRandom < 33) return 'Vissh, errou o passe, a posse troca de lado.'
  else if (numberRandom < 66) return 'Passe errado, a defesa retoma.'
  else return 'Não passa pela defesa'
}

export function narrationHoldGoalkeeper() {
  const numberRandom = Math.floor(Math.random() * 100)
  if (numberRandom < 25) return 'Defende com tranquilidade o goleiro.'
  else if (numberRandom < 50) return 'Espalma o goleiro e a defesa tem a posse.'
  else if (numberRandom < 75) return 'Segura firme o goleiro'
  else return 'Nas mãos do goleiro, a bola veio direto nele'
}

export function narrationDefenseGoalkeeper() {
  const numberRandom = Math.floor(Math.random() * 100)
  if (numberRandom < 33) return 'Defendeeeeu goleiro. Que incrível.'
  else if (numberRandom < 66) return 'Goleeeeiro faz milagre e espalma a bola.'
  else return 'Defendeu!! O goleiro faz a ponte para defender.'
}

export function narrationKickOut() {
  const numberRandom = Math.floor(Math.random() * 100)
  if (numberRandom < 25) return 'Muito Longe, tiro de meta para o goleiro.'
  else if (numberRandom < 50) return 'Raspa a trave e vai para fora.'
  else if (numberRandom < 75)
    return 'Para fooora. Incrível a oportunidade que perde.'
  else return 'Para fooora, que perigo essa bola.'
}

export function narrationKickBlocked() {
  const numberRandom = Math.floor(Math.random() * 100)
  if (numberRandom < 50) return 'A defesa bloqueia o chutee afasta o perigo.'
  else return 'Bloqueado pela defesa.'
}
