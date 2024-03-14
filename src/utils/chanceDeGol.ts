import { Moment } from '../Model/Moment'
import { emptyStats } from '../Model/Stats'

export function chanceDeGolPenalt(
  overallClub: number,
  overallAll: number,
  nameClube: string,
  homeOrAway: 'home' | 'away',
  numberOfPenalt: number,
) {
  const moments: Moment[] = []

  const momentInicio: Moment = {
    minute: 90,
    narracao: `${nameClube} para sua ${numberOfPenalt}° cobrança`,
    homeOrAway,
    stats: emptyStats,
  }
  moments.push(momentInicio)

  const MAX_PORCENTAGE_GOAL = 75
  const overallAdvs = overallAll - overallClub

  const golPorcentage =
    overallClub > overallAdvs
      ? MAX_PORCENTAGE_GOAL
      : (MAX_PORCENTAGE_GOAL * overallClub) / overallAdvs

  const numberRandom = Math.floor(Math.random() * 100)

  if (numberRandom > golPorcentage) {
    const moment: Moment = {
      minute: 90,
      narracao: 'Perdeu o Penalti',
      penalt: true,
      homeOrAway,
      stats: {
        ...emptyStats,
        qtdPenalt: 1,
      },
    }
    moments.push(moment)
  } else {
    const moment: Moment = {
      minute: 90,
      narracao: `Gol de Penalti`,
      goal: true,
      penalt: true,
      homeOrAway,
      stats: {
        ...emptyStats,
        qtdPenalt: 1,
      },
    }
    moments.push(moment)
  }

  return moments
}
